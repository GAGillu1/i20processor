"use client";
import * as React from "react";
import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useMyContext } from "@/components/myContext";
import { i20Schema, preProcessorSchema } from "@/components/utils/valSchemas";
import { i20Model, preProcessorModel } from "@/components/utils/models";
import { i20IV, preProcessorIV } from "@/components/utils/initialValues";
import { FileInput, MyInput } from "@/components/utils/myInputs";
import DsoList from "@/components/dsoList";
import ErrorMsg from "@/components/errorMsg";
import { toast } from "react-hot-toast";
import getFormData from "@/components/utils/getFormData";

async function postI20(values: preProcessorModel) {
  try {
    toast.loading("Processing", { id: "pre-processor" });
    const res = await fetch("/api/i20/pre-processor", {
      method: "POST",
      body: getFormData(values),
    });
    if (!res.ok) throw res;
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.setAttribute("download", "i20.zip");
    downloadLink.click();
    window.URL.revokeObjectURL(url);
    toast.success("Download Successful!");
  } catch (err: any) {
    toast.error(err.message);
  } finally {
    toast.remove("pre-processor");
  }
}

const Page = () => {
  const [toslate, setToslate] = useState(false);
  const data = useMyContext();
  useEffect(() => {
    setToslate(data.toSlate === "y");
  }, [data.toSlate, data]);
  return (
    <main className="main">
      <h2>I20 Pre-processor</h2>
      <section className="section">
        <Formik
          initialValues={preProcessorIV}
          validationSchema={preProcessorSchema}
          onSubmit={(values: preProcessorModel) => postI20(values)}
        >
          <section className="w-[90%] mx-auto">
            <h2 className="formHeader">Import I20</h2>
            <Form className="grid grid-cols-3 gap-y-2 items-center">
              <label htmlFor="instance">Instance:</label>
              <Field as="select" name="instance" className="col-span-2">
                <option value="">Select Instance</option>
                {/* <DsoList /> */}
              </Field>
              <ErrorMsg name="instance" className="col-span-2 col-start-2" />
              <h3 className="col-span-3 text-center">VPN Credentials</h3>
              <label htmlFor="vpnUsername">Username</label>
              <Field
                name="vpnUsername"
                placeholder="john12"
                className="col-span-2"
              />
              <ErrorMsg name="vpnUsername" className="col-span-2 col-start-2" />
              <label htmlFor="vpnPassword">Password</label>
              <Field
                name="vpnPassword"
                type="password"
                className="col-span-2"
              />
              <ErrorMsg name="vpnPassword" className="col-span-2 col-start-2" />
              <h3 className="col-span-3 text-center">ISSM Credentials</h3>
              <label htmlFor="issmUsername">Username</label>
              <Field
                name="issmUsername"
                placeholder="john12"
                className="col-span-2"
              />
              <ErrorMsg
                name="issmUsername"
                className="col-span-2 col-start-2"
              />
              <label htmlFor="issmPassword">Password</label>
              <Field
                name="issmPassword"
                type="password"
                className="col-span-2"
              />
              <ErrorMsg
                name="issmPassword"
                className="col-span-2 col-start-2"
              />

              <label htmlFor="excelFile">Excel File:</label>
              <Field
                component={FileInput}
                name="excelFile"
                accept=".pdf"
                className="col-span-2"
              />
              <ErrorMsg name="excelFile" className="col-span-2 col-start-2" />
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

export default Page;
