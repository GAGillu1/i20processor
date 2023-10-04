"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import ErrorMsg from "@/components/utils/errorMsg";
import * as React from "react";
import { EditIcon, SaveIcon } from "@/assets/myIcons";
import { toast } from "react-hot-toast";
import { institutionModel } from "@/components/utils/models";
import getFormData from "@/components/utils/getFormData";
import { institutionSchema } from "@/components/utils/valSchemas";
import { institutionIV } from "@/components/utils/initialValues";
import { MySubmit } from "@/components/utils/myInputs";

const InstitutionInfo = () => {
  const [institutionInfo, setInstitutionInfo] =
    useState<institutionModel>(institutionIV);
  const institutionName = useSearchParams().get("institution");
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    setLoading(true);
    getInstitutionInfo(institutionName);
    setEditable(true);
  }, [institutionName]);

  const updateInstitution = async (values: institutionModel) => {
    try {
      console.log("Institution Info", values);
      const res = await fetch("/api/institution/" + institutionName, {
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

  const getInstitutionInfo = async (institutionName: string | null) => {
    await fetch("/api/institution/" + institutionName)
      .then((res) => res.json())
      .then((institutionInfo) => {
        setInstitutionInfo(institutionInfo.data);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <h1 className="text-center font-bold text-xl text-slate-700 py-2">
        Institution Info
      </h1>
      {!loading && (
        <Formik
          initialValues={institutionInfo}
          validationSchema={institutionSchema}
          onSubmit={(values) => updateInstitution(values)}
        >
          <section>
            <Form>
              <label htmlFor="institutionName">Institution Name</label>
              <Field name="institutionName" readOnly={editable} />
              <ErrorMsg name="institutionName" />
              <label htmlFor="adminFullName">Admin Full Name</label>
              <Field name="adminFullName" readOnly={editable} />
              <ErrorMsg name="adminFullName" />
              <label htmlFor="adminDisplayName">Admin Display Name</label>
              <Field name="adminDisplayName" readOnly={editable} />
              <ErrorMsg name="adminDisplayName" />
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" readOnly={editable} />
              <ErrorMsg name="email" />
              <label htmlFor="crm">CRM</label>
              <Field name="crm" readOnly={editable} />
              <ErrorMsg name="crm" />
              <label htmlFor="adminContact">Admin Contact</label>
              <Field name="adminContact" readOnly={editable} />
              <ErrorMsg name="adminContact" />
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
                <MySubmit
                  hidden={editable}
                  loading={loading}
                  loadingMsg={"Saving"}
                  action="Save"
                >
                  <SaveIcon />
                </MySubmit>
              </div>
            </Form>
          </section>
        </Formik>
      )}
    </section>
  );
};

export default InstitutionInfo;