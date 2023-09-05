"use client";
import ErrorMsg from "@/components/errorMsg";
import { useContextDispatch } from "@/components/myContext";
import getFormData from "@/components/utils/getFormData";
import { changePwdIV, updateUserIV } from "@/components/utils/initialValues";
import { changePwdModel, userModel } from "@/components/utils/models";
import {
  changePwdSchema,
  forgotPwdSchema,
} from "@/components/utils/valSchemas";
import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Profile = ({ params }: { params: { username: string } }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<userModel>(updateUserIV);
  const usr = params.username;
  const dispatch = useContextDispatch();
  useEffect(() => {
    setLoading(true);
    getUserInfo(usr);
  }, [usr]);

  const getUserInfo = async (usr: string | null) => {
    await fetch("/api/users/" + usr)
      .then((res) => res.json())
      .then((usrInfo) => {
        setUserInfo(usrInfo.data);
        setLoading(false);
      });
  };

  async function updatePwd(values: changePwdModel) {
    try {
      setLoading(true);
      const res = await fetch("/api/changePwd/" + usr, {
        method: "PUT",
        body: getFormData(values),
      });
      if (!res.ok) throw res;
      const data = await res.json();
      toast.success(data.message);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(values: userModel) {
    try {
      setLoading(true);
      const res = await fetch("/api/users/" + usr, {
        method: "PUT",
        body: getFormData(values),
      });
      if (!res.ok) throw res;
      const data = await res.json();
      console.log(data);
      dispatch({ type: "userUpdate", action: data.data });
      toast.success(data.message);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="w-[95%] mx-auto">
      <h2>Account Settings</h2>
      <section className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-lg p-4">
          <h3>Personal Information</h3>
          <p className="text-sm text-slate-600">
            Access and edit your personal information
          </p>
          {!loading && (
            <Formik
              initialValues={userInfo}
              validationSchema={forgotPwdSchema}
              onSubmit={(values) => updateUser(values)}
            >
              {
                <section className="p-12 max-h-[60%] my-auto rounded-lg w-[90%] font-semibold text-gray-700">
                  <Form className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <Field name="username" />
                    <ErrorMsg name="username" />
                    <label htmlFor="fullname">Full Name</label>
                    <Field name="fullname" />
                    <ErrorMsg name="fullname" />
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" />
                    <ErrorMsg name="email" />

                    <div className="flex justify-end items-center mt-4">
                      <button type="submit">
                        <span
                          className="animate-ping w-2 h-2 bg-indigo-700 rounded-full absolute"
                          hidden={!loading}
                        />
                        <span
                          className=" w-2 h-2 bg-indigo-900 rounded-full"
                          hidden={!loading}
                        />
                        {loading ? "Processing" : "Update Profile"}
                      </button>
                    </div>
                  </Form>
                </section>
              }
            </Formik>
          )}
        </div>
        <div className="bg-white rounded-lg p-4">
          <h3>Change Password</h3>
          <p className="text-sm text-slate-600">Update your account password</p>
          <Formik
            initialValues={changePwdIV}
            validationSchema={changePwdSchema}
            onSubmit={(values) => updatePwd(values)}
          >
            {
              <section className="p-12 max-h-[60%] my-auto rounded-lg w-[90%] font-semibold text-gray-700">
                <Form className="flex flex-col gap-1">
                  <label htmlFor="cPwd">Current Password</label>
                  <Field name="cPwd" type="password" />
                  <ErrorMsg name="cPwd" />
                  <label htmlFor="nPwd">New Password</label>
                  <Field name="nPwd" type="password" />
                  <ErrorMsg name="nPwd" />
                  <label htmlFor="cNPwd">Confirm New Password</label>
                  <Field name="cNPwd" type="password" />
                  <ErrorMsg name="cNPwd" />

                  <div className="flex justify-end items-center mt-4">
                    <button type="submit">
                      <span
                        className="animate-ping w-2 h-2 bg-indigo-700 rounded-full absolute"
                        hidden={!loading}
                      />
                      <span
                        className=" w-2 h-2 bg-indigo-900 rounded-full"
                        hidden={!loading}
                      />
                      {loading ? "Processing" : "Update Password"}
                    </button>
                  </div>
                </Form>
              </section>
            }
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default Profile;
