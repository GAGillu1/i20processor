"use client";
import * as React from "react";
import { Field, Form, Formik } from "formik";
import ErrorMsg from "@/components/utils/errorMsg";
import { useState } from "react";
import toast from "react-hot-toast";
import getFormData from "@/components/utils/getFormData";
import { institutionModel } from "@/components/utils/models";
import { institutionIV } from "@/components/utils/initialValues";
import { institutionSchema } from "@/components/utils/valSchemas";
import { MySubmit, PhInput } from "@/components/utils/myInputs";

const AddUniversity = () => {
  const [loading, setLoading] = useState(false);
  const addUniversity = async (values: institutionModel) => {
    try {
      // console.log("New Institution", values);
      setLoading(true);
      const res = await fetch("/api/institution", {
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
      <h2 className="text-center">Add New Institution</h2>
      <Formik
        initialValues={institutionIV}
        validationSchema={institutionSchema}
        onSubmit={(values) => addUniversity(values)}
      >
        <section>
          <Form>
            <label htmlFor="institutionName">Institution Name</label>
            <Field name="institutionName" />
            <ErrorMsg name="institutionName" />
            <label htmlFor="crm">CRM</label>
            <Field name="crm" />
            <ErrorMsg name="crm" />
            <h3 className="pt-3 text-center">Primary Contact</h3>
            <label htmlFor="adminFullName">Full Name</label>
            <Field name="adminFullName" />
            <ErrorMsg name="adminDisplayName" />
            <label htmlFor="adminDisplayName">Display Name</label>
            <Field name="adminDisplayName" />
            <ErrorMsg name="adminFullName" />
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMsg name="email" />

            <label htmlFor="adminContact">Contact</label>
            <Field name="adminContact" component={PhInput} />
            <ErrorMsg name="adminContact" />
            <div className="flex items-center justify-end  pt-2">
              <MySubmit loading={loading} loadingMsg="Adding" action="Add" />
            </div>
          </Form>
        </section>
      </Formik>
    </section>
  );
};

export default AddUniversity;
