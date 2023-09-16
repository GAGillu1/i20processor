"use client";
import * as React from "react";
import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useMyContext } from "@/components/myContext";
import { i20Schema } from "@/components/utils/valSchemas";
import { i20Model, sParams } from "@/components/utils/models";
import { i20IV } from "@/components/utils/initialValues";
import { FileInput, MyInput } from "@/components/utils/myInputs";
import DsoList from "@/components/dsoList";
import ErrorMsg from "@/components/errorMsg";
import { toast } from "react-hot-toast";
import getFormData from "@/components/utils/getFormData";
import { ProgressBar, Response } from "@/components/utils/progessBar";
import { useRouter } from "next/navigation";

const Page = ({ searchParams }: sParams) => {
  const router = useRouter();
  const [toslate, setToslate] = useState(false);
  const [loading, setLoading] = useState(false);
  const showResults = searchParams?.result;
  const data = useMyContext();

  async function postI20(values: i20Model) {
    try {
      setLoading(true);
      const res = await fetch("/api/i20/post-processor", {
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
      router.push("/i20/post-processor?result=true");
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setToslate(data.toSlate === "y");
  }, [data.toSlate, data]);
  return (
    <main className="main">
      <h2>I20 Post-processor</h2>
      <section className="section">
        {showResults ? (
          <Response />
        ) : (
          <Formik
            initialValues={i20IV}
            validationSchema={i20Schema}
            onSubmit={(values: i20Model) => postI20(values)}
          >
            <section className="w-[90%] mx-auto">
              <h2 className="formHeader">Import I20</h2>
              <Form className="grid grid-cols-3 gap-y-2 items-center">
                <label htmlFor="i20Type">I20 Type:</label>
                <Field component="select" name="i20Type" className="col-span-2">
                  <option value="initI20">Initial I20</option>
                  <option value="contdI20">Continued I20</option>
                </Field>
                <label htmlFor="dsoName">DSO:</label>
                <Field as="select" name="dsoName" className="col-span-2">
                  <option value="">Select DSO</option>
                  <DsoList />
                </Field>
                <ErrorMsg name="dsoName" className="col-span-2 col-start-2" />
                <label htmlFor="i20File">I20 File:</label>
                <Field
                  component={FileInput}
                  name="i20File"
                  accept=".pdf"
                  className="col-span-2"
                />
                <ErrorMsg name="i20File" className="col-span-2 col-start-2" />
                <label htmlFor="issmFile">ISSM File:</label>
                <Field
                  component={FileInput}
                  name="issmFile"
                  accept=".xlsx"
                  className="col-span-2"
                />
                <ErrorMsg name="issmFile" className="col-span-2 col-start-2" />
                <label htmlFor="slateFile">Slate File:</label>
                <Field
                  component={FileInput}
                  name="slateFile"
                  accept=".xlsx"
                  className="col-span-2"
                />
                <ErrorMsg name="slateFile" className="col-span-2 col-start-2" />
                <label htmlFor="toSlate"> Transfer File to Slate:</label>
                <Field
                  component={MyInput}
                  name="toSlate"
                  className="col-span-2"
                >
                  <option value="n">No</option>
                  <option value="y">Yes</option>
                </Field>
                <ErrorMsg name="toSlate" />
                {toslate && (
                  <>
                    <label htmlFor="prog"> Program:</label>
                    <Field
                      component="select"
                      name="prog"
                      className="col-span-2"
                    >
                      <option value="ug">Under Graduate</option>
                      <option value="g">Graduate</option>
                    </Field>
                    <ErrorMsg name="prog" className="col-span-2 col-start-2" />
                  </>
                )}
                <div className="mx-auto col-span-3 mt-8">
                  <button type="submit">Process</button>
                </div>
              </Form>
            </section>
          </Formik>
        )}
      </section>
      {loading && <ProgressBar />}
    </main>
  );
};

export default Page;
