"use client";
import ErrorMsg from "@/components/errorMsg";
import { instanceIV } from "@/components/utils/initialValues";
import { instanceModel } from "@/components/utils/models";
import { instanceSchema } from "@/components/utils/valSchemas";
import { Field, Form, Formik } from "formik";
import { MySubmit, MyTextArea } from "./utils/myInputs";
import { useState } from "react";
import getFormData from "./utils/getFormData";
import { toast } from "react-hot-toast";
const AddInstance = () => {
  const [loading, setLoading] = useState(false);
  const addInstance = async (values: instanceModel) => {
    try {
      setLoading(true);
      const res = await fetch("/api/instance", {
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
      <Formik
        initialValues={instanceIV}
        validationSchema={instanceSchema}
        onSubmit={(values: instanceModel) => addInstance(values)}
      >
        <section>
          <h2 className="text-center">Add New Instance</h2>
          <Form>
            <label htmlFor="type">Instance Name:</label>
            <Field name="type" />
            <ErrorMsg name="type" />
            <label htmlFor="username">Username:</label>
            <Field name="username" />
            <ErrorMsg name="username" />
            <label htmlFor="password">Password:</label>
            <Field name="password" />
            <ErrorMsg name="password" />
            <label htmlFor="endpoint">JSON Endpoint:</label>
            <Field name="endpoint" component={MyTextArea} />
            <ErrorMsg name="endpoint" className="col-start-2 col-span-2" />
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

export default AddInstance;
