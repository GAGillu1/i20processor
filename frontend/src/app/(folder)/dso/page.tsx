"use client";
import * as React from "react";
import { Field, Form, Formik } from "formik";
import ErrorMsg from "@/components/errorMsg";
import * as Yup from "yup";
import DsoList from "@/components/dsoList";
import { useState, useEffect } from "react";
import { useMyContext } from "@/components/myContext";
import { dsoModel } from "@/components/utils/models";
import { dsoIV } from "@/components/utils/initialValues";
import {
  DsoCheckBox,
  FileInput,
  MyCheckBox,
} from "@/components/utils/myInputs";
import { toast } from "react-hot-toast";

const getFormData = (val: dsoModel) => {
  let fD = new FormData();
  for (const [key, value] of Object.entries(val)) {
    fD.append(key, value);
  }
  return fD;
};

async function postI20(values: dsoModel) {
  console.log(values);
  const res = await fetch("/api/dso", {
    method: "POST",
    body: getFormData(values),
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.setAttribute("download", "i20.zip");
  downloadLink.click();
  window.URL.revokeObjectURL(url);
  toast.success("Download Succesful!");
}

const dsoSchema = Yup.object({
  // dso: Yup.mixed().required("Please select a DSO"),
  i20File: Yup.mixed().required("Please select a i20 file"),
});

const Dso = () => {
  const [sign, setSign] = useState(false);
  const data = useMyContext();
  useEffect(() => {
    setSign(data.dsoSign);
  }, [data.dsoSign]);
  return (
    <main className="main">
      <section className="section">
        <h2 className="formHeader">Import I20</h2>
        <Formik
          initialValues={dsoIV}
          validationSchema={dsoSchema}
          onSubmit={(values) => postI20(values)}
        >
          <section className="w-[90%] mx-auto">
            <Form className="grid grid-cols-3 gap-y-2 items-center">
              <label>Actions:</label>
              <div className="flex gap-1 items-center">
                <Field component={DsoCheckBox} name="sign" className="h-full" />
                <label htmlFor="sign">Signature</label>
              </div>
              <div className="flex gap-1 items-center">
                <Field component={MyCheckBox} name="split" />
                <label htmlFor="split">Split</label>
              </div>
              {sign && (
                <React.Fragment>
                  <label htmlFor="dso">DSO:</label>
                  <Field as="select" name="dso" className="col-span-2">
                    <option value="">Select DSO</option>
                    <DsoList />
                  </Field>
                  <ErrorMsg name="dso" className="col-span-2 col-start-2" />
                </React.Fragment>
              )}
              <label htmlFor="i20File">I20 File:</label>
              <Field
                component={FileInput}
                name="i20File"
                accept=".pdf"
                className="col-span-2"
              />
              <ErrorMsg name="i20File" className="col-span-2 col-start-2" />
              <div className="col-span-3 mx-auto mt-8">
                <button type="submit">Process</button>
              </div>
            </Form>
          </section>
        </Formik>
      </section>
    </main>
  );
};

export default Dso;
