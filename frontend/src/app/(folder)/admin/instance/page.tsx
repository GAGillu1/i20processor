"use client";
import ErrorMsg from "@/components/errorMsg";
import { instanceIV } from "@/components/utils/initialValues";

import { instanceModel } from "@/components/utils/models";
import { MyInput } from "@/components/utils/myInputs";
import { instanceSchema } from "@/components/utils/valSchemas";
import { Field, Form, Formik } from "formik";
const Instance = () => {
  return (
    <main className="main">
      <section className="section">
        <Formik
          initialValues={instanceIV}
          validationSchema={instanceSchema}
          onSubmit={(values: instanceModel) => console.log(values)}
        >
          <section className="w-[90%] mx-auto">
            <h2 className="formHeader">Add New Instance</h2>
            <Form className="grid grid-cols-3 gap-y-2 items-center">
              <label htmlFor="name">Instance Name:</label>
              <Field name="name" className="col-span-2" />
              <ErrorMsg name="name" />
              <label htmlFor="username">Username:</label>
              <Field name="username" className="col-span-2" />
              <ErrorMsg name="username" />
              <label htmlFor="password">Password:</label>
              <Field name="password" className="col-span-2" />
              <ErrorMsg name="password" />
              <label htmlFor="endpoint">JSON Endpoint:</label>
              <Field name="endpoint" className="col-span-2" />
              <ErrorMsg name="endpoint" />
              <label htmlFor="toSlate"> Transfer File to Slate:</label>
              <Field component={MyInput} name="toSlate" className="col-span-2">
                <option value="n">No</option>
                <option value="y">Yes</option>
              </Field>
              <ErrorMsg name="toSlate" />
              <div className="mx-auto col-span-3 mt-8">
                <button type="submit">Process</button>
              </div>
            </Form>
          </section>
        </Formik>
      </section>
    </main>
  );
};

export default Instance;
