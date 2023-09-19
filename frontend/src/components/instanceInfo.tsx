"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import ErrorMsg from "@/components/errorMsg";
import * as React from "react";
import { instanceSchema } from "./utils/valSchemas";
import { instanceModel } from "./utils/models";
import { instanceIV } from "./utils/initialValues";
import { EditIcon, SaveIcon } from "@/assets/myIcons";
import { toast } from "react-hot-toast";
import getFormData from "./utils/getFormData";

const InstanceInfo = () => {
  const [instanceInfo, setInstanceInfo] = useState<instanceModel>(instanceIV);
  const instanceType = useSearchParams().get("instance");
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    setLoading(true);
    getInstanceInfo(instanceType);
    setEditable(true);
  }, [instanceType]);

  const updateInstance = async (values: instanceModel) => {
    try {
      console.log("Instance Info", values);
      const res = await fetch("/api/instance/" + instanceType, {
        method: "PUT",
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

  const getInstanceInfo = async (instanceType: string | null) => {
    await fetch("/api/instance/" + instanceType)
      .then((res) => res.json())
      .then((instanceInfo) => {
        setInstanceInfo(instanceInfo.data);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <h1 className="text-center font-bold text-xl text-slate-700 py-2">
        Instance Info
      </h1>
      {!loading && (
        <Formik
          initialValues={instanceInfo}
          validationSchema={instanceSchema}
          onSubmit={(values) => updateInstance(values)}
        >
          <section>
            <Form>
              <label htmlFor="type">Instance Type</label>
              <Field name="type" readOnly />
              <ErrorMsg name="type" />
              <label htmlFor="username">Username</label>
              <Field name="username" readOnly={editable} />
              <ErrorMsg name="username" />
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" readOnly={editable} />
              <ErrorMsg name="password" />
              <label htmlFor="endpoint">Endpoint</label>
              <Field name="endpoint" as="textarea" readOnly />
              <ErrorMsg name="endpoint" />
              <div className="flex gap-2 items-center justify-end pt-4">
                <button
                  type="button"
                  className={`bg-indigo-100 rounded px-4 py-2 flex items-center gap-2 hover:bg-indigo-50 text-indigo-900 font-semibold tracking-wide ${
                    editable ? "" : " hidden"
                  }`}
                  onClick={() => setEditable(!editable)}
                >
                  <EditIcon />
                  Edit
                </button>
                <button type="submit" hidden={editable}>
                  <SaveIcon />
                  Save
                </button>
              </div>
            </Form>
          </section>
        </Formik>
      )}
    </section>
  );
};

export default InstanceInfo;
