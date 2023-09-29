"use client";
import ErrorMsg from "@/components/utils/errorMsg";
import { useContextDispatch, useMyContext } from "@/components/utils/myContext";
import getFormData from "@/components/utils/getFormData";
import { updateUserIV } from "@/components/utils/initialValues";
import { userModel } from "@/components/utils/models";
import { forgotPwdSchema } from "@/components/utils/valSchemas";
import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MySubmit } from "../utils/myInputs";
const MyInfo = ({ ...props }) => {
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<userModel>(updateUserIV);
  const usr = props.username;
  const dispatch = useContextDispatch();
  useEffect(() => {
    console.log(usr);
    setDataLoading(true);
    getUserInfo(usr);
  }, [usr]);

  const getUserInfo = async (usr: string | null) => {
    await fetch("/api/users/" + usr)
      .then((res) => res.json())
      .then((usrInfo) => {
        setUserInfo(usrInfo.data);
        setDataLoading(false);
      });
  };

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
    <div className="bg-white rounded-lg p-4">
      <h3>Personal Information</h3>
      <p className="text-sm text-slate-600">
        Access and edit your personal information
      </p>
      {!dataLoading && (
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
                  <MySubmit
                    loading={loading}
                    loadingMsg="Updating"
                    action="Update Profile"
                  />
                </div>
              </Form>
            </section>
          }
        </Formik>
      )}
    </div>
  );
};

export default MyInfo;
