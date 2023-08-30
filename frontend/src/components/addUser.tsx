"use client";
import * as React from "react";
import { Field, Form, Formik } from "formik";
import ErrorMsg from "@/components/errorMsg";
import { addUserSchema } from "./utils/valSchemas";
import { addUserIV } from "./utils/initialValues";
import { userModel } from "./utils/models";
import { toast } from "react-hot-toast";
import getFormData from "./utils/getFormData";
const AddUser = () => {
  const addUser = async (values: userModel) => {
    try {
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
    }
  };
  return (
    <section>
      <h1>Add New user</h1>
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
              <button type="submit">Register</button>
            </div>
          </Form>
        </section>
      </Formik>
    </section>
  );
};

export default AddUser;
