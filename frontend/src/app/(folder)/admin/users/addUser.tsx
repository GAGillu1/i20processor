"use client";
import * as React from "react";
import { Field, Form, Formik } from "formik";
import ErrorMsg from "@/components/utils/errorMsg";
import { useState } from "react";
import { userModel } from "@/components/utils/models";
import getFormData from "@/components/utils/getFormData";
import toast from "react-hot-toast";
import { addUserIV } from "@/components/utils/initialValues";
import { addUserSchema } from "@/components/utils/valSchemas";
import { MySubmit } from "@/components/utils/myInputs";

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const addUser = async (values: userModel) => {
    try {
      setLoading(true);
      const res = await fetch("/api/users", {
        method: "POST",
        body: getFormData(values),
      });
      if (!res.ok) throw res;
      const data = await res.json();
      console.log(data);
      toast.success(data.message);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <h2 className="text-center">Add New user</h2>
      <Formik
        initialValues={addUserIV}
        validationSchema={addUserSchema}
        onSubmit={(values) => addUser(values)}
      >
        <section>
          <Form>
            <label htmlFor="username">Username</label>
            <Field name="username" />
            <ErrorMsg name="username" />
            <label htmlFor="fullname" className="pt-1">
              Full name
            </label>
            <Field name="fullname" />
            <ErrorMsg name="fullname" />
            <label htmlFor="email" className="pt-1">
              Email
            </label>
            <Field name="email" />
            <ErrorMsg name="email" />
            <label htmlFor="role" className="pt-1">
              Role
            </label>
            <Field component="select" name="role" className="px-1">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
            </Field>

            <ErrorMsg name="role" className="col-span-2 col-start-2" />
            <div className="flex items-center justify-end  pt-2">
              <MySubmit
                loading={loading}
                loadingMsg="Adding"
                action="Register"
              />
            </div>
          </Form>
        </section>
      </Formik>
    </section>
  );
};

export default AddUser;
