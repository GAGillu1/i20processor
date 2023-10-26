"use client";
import ErrorMsg from "@/components/utils/errorMsg";
import { useMyContext } from "@/components/utils/myContext";
import getFormData from "@/components/utils/getFormData";
import { changePwdIV } from "@/components/utils/initialValues";
import { changePwdModel } from "@/components/utils/models";
import { changePwdSchema } from "@/components/utils/valSchemas";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { MyButton } from "../../../components/utils/myInputs";

const ChangePwd = () => {
  const [loading, setLoading] = useState(false);
  const myData = useMyContext();
  const usr = myData.username;

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

  return (
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
                <MyButton
                  loading={loading}
                  loadingMsg="Updating"
                  action="Update Password"
                />
              </div>
            </Form>
          </section>
        }
      </Formik>
    </div>
  );
};

export default ChangePwd;
