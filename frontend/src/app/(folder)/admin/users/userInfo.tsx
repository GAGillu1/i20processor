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
import { MyButton, Toggle } from "@/components/utils/myInputs";
import { useMyContext } from "@/components/utils/myContext";
import { motion } from "framer-motion";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<userModel>(userInfoIV);
  const email = useSearchParams().get("user");
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(true);
  const userData = useMyContext();
  const isSuperUser = userData.role === "SuperUser";

  useEffect(() => {
    setDataLoading(true);
    getUserInfo(email);
    setEditable(true);
  }, [email]);

  const updateUser = async (values: userModel) => {
    try {
      setLoading(true);
      // console.log("userInfo", values);
      const res = await fetch("/api/users/" + email, {
        method: "PUT",
        body: getFormData(values),
      });
      if (!res.ok) throw res;
      const data = await res.json();
      // console.log(data);
      toast.success(data.message);
      getUserInfo(email);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = async (usr: string | null) => {
    try {
      setDataLoading(true);
      const res = await fetch("/api/users/" + usr);
      if (!res.ok) throw res;
      const data = await res.json();
      setUserInfo(data.data);
      console.log(data);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setDataLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
              <label htmlFor="username">Display Name</label>
              <Field name="username" readOnly={editable} />
              <ErrorMsg name="username" />
              <label htmlFor="fullname">Full name</label>
              <Field name="fullname" readOnly={editable} />
              <ErrorMsg name="fullname" />
              <label htmlFor="email">Email</label>
              <br />
              <Field name="email" readOnly />
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
                  href={`/admin/users/?user=${email}&addSign=true`}
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
                <MyButton
                  hidden={editable}
                  loading={loading}
                  loadingMsg={"Saving"}
                  action="Save"
                >
                  <SaveIcon />
                </MyButton>
              </div>
            </Form>
          </section>
        </Formik>
      )}
    </motion.section>
  );
};

export default UserInfo;
