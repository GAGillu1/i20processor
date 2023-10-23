"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import ErrorMsg from "@/components/utils/errorMsg";
import * as React from "react";

import { EditIcon, SaveIcon } from "@/assets/myIcons";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { userInfoIV } from "@/components/utils/initialValues";
import { userModel } from "@/components/utils/models";
import getFormData from "@/components/utils/getFormData";
import { userSchema } from "@/components/utils/valSchemas";
import { MySubmit, Toggle } from "@/components/utils/myInputs";
import { useMyContext } from "@/components/utils/myContext";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<userModel>(userInfoIV);
  const username = useSearchParams().get("user");
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(true);
  const userData = useMyContext();
  const isSuperUser = userData.role === "SuperUser";

  useEffect(() => {
    setDataLoading(true);
    getUserInfo(username);
    setEditable(true);
  }, [username]);

  const updateUser = async (values: userModel) => {
    try {
      setLoading(true);
      console.log("userInfo", values);
      const res = await fetch("/api/users/" + username, {
        method: "PUT",
        body: getFormData(values),
      });
      if (!res.ok) throw res;
      const data = await res.json();
      console.log(data);
      toast.success(data.message);
      getUserInfo(username);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = async (usr: string | null) => {
    await fetch("/api/users/" + usr)
      .then((res) => res.json())
      .then((usrInfo) => {
        setUserInfo(usrInfo.data);
        console.log(usrInfo);
      })
      .then(() => {
        setDataLoading(false);
      });
  };

  return (
    <section>
      <h1 className="text-center font-bold text-xl text-slate-700 py-2">
        User Info
      </h1>
      {!dataLoading && (
        <Formik
          initialValues={userInfo}
          validationSchema={userSchema}
          onSubmit={(values) => updateUser(values)}
        >
          <section>
            <Field
              component={Toggle}
              name="active"
              active={userInfo.active}
              disabled={editable}
            />
            {/* <Toggle /> */}
            <Form>
              <label htmlFor="username">Username</label>
              <Field name="username" readOnly={editable} />
              <ErrorMsg name="username" />
              <label htmlFor="fullname">Full name</label>
              <Field name="fullname" readOnly={editable} />
              <ErrorMsg name="fullname" />
              <label htmlFor="email">Email</label>
              <br />
              <Field name="email" readOnly={editable} />
              <ErrorMsg name="email" />
              <label htmlFor="role" className="">
                Role
              </label>
              <br />
              <Field
                component="select"
                name="role"
                className="px-1"
                disabled={editable}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                {isSuperUser && (
                  <option value="PrimaryContact">Primary Contact</option>
                )}
                {isSuperUser && <option value="SuperUser">Super User</option>}
              </Field>

              <ErrorMsg name="role" className="col-span-2 col-start-2" />
              <div className="flex gap-2 items-center justify-end pt-4">
                <Link
                  href={`/admin/users/?user=${username}&addSign=true`}
                  className="bg-indigo-100 rounded px-4 py-2 flex items-center gap-2 hover:bg-indigo-50 text-indigo-900 font-semibold tracking-wide"
                >
                  + Add Signature
                </Link>
                <button
                  type="button"
                  className={`bg-indigo-100 rounded px-4 py-2 flex items-center gap-2 hover:bg-indigo-50 text-indigo-900 font-semibold tracking-wide ${
                    editable ? "" : " hidden"
                  }`}
                  onClick={() => setEditable(!editable)}
                >
                  <EditIcon />
                  Edit
                </button>
                <MySubmit
                  hidden={editable}
                  loading={loading}
                  loadingMsg={"Saving"}
                  action="Save"
                >
                  <SaveIcon />
                </MySubmit>
              </div>
            </Form>
          </section>
        </Formik>
      )}
    </section>
  );
};

export default UserInfo;
