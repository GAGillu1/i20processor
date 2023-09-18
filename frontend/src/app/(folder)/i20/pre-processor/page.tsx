"use client";
import * as React from "react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useContextDispatch, useMyContext } from "@/components/myContext";
import { preProcessorSchema } from "@/components/utils/valSchemas";
import { preProcessorModel, sParams } from "@/components/utils/models";
import { preProcessorIV } from "@/components/utils/initialValues";
import { FileInput, MySubmit } from "@/components/utils/myInputs";
import ErrorMsg from "@/components/errorMsg";
import { toast } from "react-hot-toast";
import getFormData from "@/components/utils/getFormData";
import { ProgressBar, Response } from "@/components/utils/progessBar";
import { useRouter } from "next/navigation";

const Page = ({ searchParams }: sParams) => {
  const router = useRouter();
  const dispatch = useContextDispatch();
  async function postI20(values: preProcessorModel) {
    try {
      setLoading(true);
      const res = await fetch("/api/i20/pre-processor", {
        method: "POST",
        body: getFormData(values),
      });
      if (res.status === 200) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.setAttribute("download", "Duplicate_Issm_Records.xlsx");
        downloadLink.click();
        window.URL.revokeObjectURL(url);
        toast.success("Download Successful!");
        router.push("/i20/pre-processor?result=true");
      } else if (res.status === 201) {
        const data = await res.json();
        toast.success(data.message);
      } else {
        throw res;
      }
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setLoading(false);
      dispatch({ type: "preProcessUpdate", action: 0 });
    }
  }
  const [loading, setLoading] = useState(false);
  const showResults = searchParams?.result;
  const data = useMyContext();
  return (
    <main className="main">
      <h2>I20 Pre-processor</h2>
      <section className="section">
        {showResults ? (
          <Response />
        ) : (
          <Formik
            initialValues={preProcessorIV}
            validationSchema={preProcessorSchema}
            onSubmit={(values: preProcessorModel) => postI20(values)}
          >
            <section className="w-[90%] mx-auto">
              <h2 className="formHeader">Import I20</h2>
              <Form className="grid grid-cols-3 gap-y-2 items-center">
                <label htmlFor="instance">Instance:</label>
                {/* <Field as="select" name="instance" className="col-span-2">
                <option value="">Select Instance</option>
                <DsoList />
              </Field> */}
                <Field name="instance" className="col-span-2" />
                <ErrorMsg name="instance" className="col-span-2 col-start-2" />
                <h3 className="col-span-3 text-center">VPN Credentials</h3>
                <label htmlFor="vpnUsername">Username</label>
                <Field
                  name="vpnUsername"
                  placeholder="john12"
                  className="col-span-2"
                />
                <ErrorMsg
                  name="vpnUsername"
                  className="col-span-2 col-start-2"
                />
                <label htmlFor="vpnPassword">Password</label>
                <Field
                  name="vpnPassword"
                  type="password"
                  className="col-span-2"
                />
                <ErrorMsg
                  name="vpnPassword"
                  className="col-span-2 col-start-2"
                />
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
                  accept=".xlsx"
                  className="col-span-2"
                />
                <ErrorMsg name="excelFile" className="col-span-2 col-start-2" />
                <div className="mx-auto col-span-3 mt-8">
                  <MySubmit
                    loading={loading}
                    loadingMsg={"Processing"}
                    action={"Process"}
                  />
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
