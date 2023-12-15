"use client";
import * as React from "react";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useState } from "react";
import { useContextDispatch, useMyContext } from "@/components/utils/myContext";
import {
  NoVPNpreProcessorSchema,
  preProcessorSchema,
} from "@/components/utils/valSchemas";
import { preProcessorModel, sParams } from "@/components/utils/models";
import { preProcessorIV } from "@/components/utils/initialValues";
import {
  FileInput,
  MyCheckBox,
  MyButton,
  Toggle,
} from "@/components/utils/myInputs";
import ErrorMsg from "@/components/utils/errorMsg";
import { toast } from "react-hot-toast";
import getFormData, {
  getEncryptedFormData,
} from "@/components/utils/getFormData";
import { ProgressBar, Response } from "@/components/utils/progessBar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import InstanceList from "../instanceList";

const Page = ({ searchParams }: sParams) => {
  const router = useRouter();
  const dispatch = useContextDispatch();
  const data = useMyContext();
  const showResults = searchParams?.result;
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [vpn, setVpn] = useState(false);
  const [intialValues, setInitialValues] = useState(preProcessorIV);

  const FormStatus = () => {
    const { values }: { values: preProcessorModel } = useFormikContext();
    React.useEffect(() => {
      setVpn(values.vpn);
    }, [values]);
    return null;
  };

  React.useEffect(() => {
    // setInitialValues(data.preProcessorState);
    setLoading(data.preProcessStatus !== 0);
    // setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function postI20(values: preProcessorModel) {
    try {
      setLoading(true);
      const res = await fetch("/api/i20/pre-processor", {
        method: "POST",
        body: getEncryptedFormData(values),
        // body: getFormData(values),
      });
      switch (res.status) {
        case 200: {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
          downloadLink.setAttribute("download", "Duplicate_Issm_Records.xlsx");
          downloadLink.click();
          window.URL.revokeObjectURL(url);
          toast.success("Download Successful!");
          router.push("/i20/pre-processor?result=true");
        }
        case 201: {
          router.push("/i20/pre-processor?result=true");
          const data = await res.json();
          toast.success(data.message);
        }
        case 400: {
          router.push("/i20/pre-processor?result=true");
          const data = await res.json();
          toast.error(data.message);
        }
        default: {
          throw res;
        }
      }
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setLoading(false);
      dispatch({ type: "preProcessUpdate", action: 0 });
    }
  }
  return (
    <motion.main
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>I20 Pre-processor</h2>
      <section className="section">
        {showResults ? (
          <Response />
        ) : (
          <Formik
            initialValues={preProcessorIV}
            validationSchema={
              vpn ? preProcessorSchema : NoVPNpreProcessorSchema
            }
            onSubmit={(values: preProcessorModel) => postI20(values)}
          >
            <section className="w-[90%] mx-auto">
              <h2 className="formHeader">Import I20</h2>
              <Form className="grid grid-cols-3 gap-y-2 items-center">
                <label htmlFor="vpn">VPN</label>
                <div className="col-span-2 ">
                  <Field
                    component={Toggle}
                    name="vpn"
                    active={preProcessorIV.vpn}
                  />
                </div>
                {vpn && (
                  <React.Fragment>
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
                  </React.Fragment>
                )}
                <h3 className="col-span-3 text-center">CRM Credentials</h3>
                <label htmlFor="instance">Instance:</label>
                <Field as="select" name="instance" className="col-span-2">
                  <option value="">Select Instance</option>
                  <InstanceList type="Preprocessor" />
                </Field>
                <ErrorMsg name="instance" className="col-span-2 col-start-2" />
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
                <label htmlFor="deferral">Deferral:</label>
                <div className="col-span-2 flex gap-2">
                  <Field component={MyCheckBox} name="deferral" />
                  <p>Create New I-20</p>
                </div>
                <label htmlFor="excelFile">Excel File:</label>
                <Field
                  component={FileInput}
                  name="excelFile"
                  accept=".xlsx"
                  className="col-span-2"
                />
                <ErrorMsg name="excelFile" className="col-span-2 col-start-2" />
                <div className="mx-auto col-span-3 mt-8">
                  <MyButton
                    loading={loading}
                    loadingMsg={"Processing"}
                    action={"Process"}
                  />
                </div>
                <FormStatus />
              </Form>
            </section>
          </Formik>
        )}
      </section>
      {loading && <ProgressBar />}
    </motion.main>
  );
};

export default Page;
