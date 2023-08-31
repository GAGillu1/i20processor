"use client";
import { Field, Form, Formik } from "formik";
import ErrorMsg from "@/components/errorMsg";
import * as React from "react";
import { addSignSchema } from "./utils/valSchemas";
import { addSignIV } from "./utils/initialValues";
import { AddIcon, BackIcon } from "@/assets/myIcons";
import { FileInput } from "./utils/myInputs";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signModel, userModel } from "./utils/models";
import getFormData from "./utils/getFormData";
import { toast } from "react-hot-toast";

const AddSign = () => {
  const username = useSearchParams()?.get("user");
  const signIV = addSignIV;
  const addSign = async (values: signModel) => {
    const res = await fetch("/api/users/" + username, {
      method: "POST",
      body: getFormData(values),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.setAttribute("download", "i20.pdf");
    downloadLink.click();
    window.URL.revokeObjectURL(url);
    // const data = await res.json();
    // toast.success(data.message);
  };
  return (
    <section>
      <div className="flex justify-between items-center pt-2 pb-4">
        <Link href={`/admin/users?user=${username}`}>
          <BackIcon />
        </Link>
        <h1 className="text-center font-bold text-xl text-slate-700">
          Add Signature
        </h1>
        <BackIcon className="invisible text-slate-700" />
      </div>
      <Formik
        initialValues={signIV}
        validationSchema={addSignSchema}
        onSubmit={(values) => addSign(values)}
      >
        <section>
          <Form>
            <label htmlFor="x" className="pt-1">
              X-Coordinate
            </label>
            <Field name="x" />
            <ErrorMsg name="x" />
            <label htmlFor="y" className="pt-1">
              Y-Coordinate
            </label>
            <Field name="y" />
            <ErrorMsg name="y" />
            <label htmlFor="length" className="pt-1">
              Length
            </label>
            <Field name="length" />
            <ErrorMsg name="length" />
            <label htmlFor="width" className="pt-1">
              Width
            </label>
            <Field name="width" />
            <ErrorMsg name="width" />
            <label htmlFor="signFile" className="pt-1">
              Signature
            </label>
            <Field component={FileInput} name="signFile" />
            <ErrorMsg name="signFile" />
            <label htmlFor="action" className="pt-1">
              Action
            </label>
            <br />
            <Field component="select" name="action" className="px-1">
              <option value="">Select Action</option>
              <option value="test">Test</option>
              <option value="upload">Upload</option>
            </Field>
            <ErrorMsg name="action" className="col-span-2 col-start-2" />
            <div className="flex gap-2 items-center justify-end pt-4">
              <button type="submit">
                <AddIcon />
                Add Signature
              </button>
            </div>
          </Form>
        </section>
      </Formik>
    </section>
  );
};

export default AddSign;
