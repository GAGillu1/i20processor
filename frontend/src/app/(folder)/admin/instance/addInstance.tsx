"use client";
import ErrorMsg from "@/components/utils/errorMsg";
import { instanceIV } from "@/components/utils/initialValues";
import { instanceModel } from "@/components/utils/models";
import { instanceSchema } from "@/components/utils/valSchemas";
import { Field, Form, Formik, useFormikContext } from "formik";
import { MyButton } from "../../../../components/utils/myInputs";
import { useEffect, useState } from "react";
import getFormData from "../../../../components/utils/getFormData";
import { toast } from "react-hot-toast";
const AddInstance = () => {
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [formData, setFormData] = useState<instanceModel>(instanceIV);
  const addInstance = async (values: instanceModel) => {
    try {
      // console.log(values);
      setLoading(true);
      const res = await fetch("/api/instance", {
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
  const testInstance = async () => {
    try {
      // console.log(values);
      setTesting(true);
      const res = await fetch("/api/instance/test", {
        method: "POST",
        body: getFormData(formData),
      });
      if (!res.ok) throw res;
      const data = await res.json();
      console.log(data);
      toast.success(data.message);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setTesting(false);
    }
  };
  const CurrentValues = () => {
    const { values }: { values: instanceModel } = useFormikContext();
    useEffect(() => {
      setFormData(values);
    }, [values]);
    return null;
  };
  return (
    <section>
      <Formik
        initialValues={instanceIV}
        validationSchema={instanceSchema}
        onSubmit={(values: instanceModel) => addInstance(values)}
      >
        <section>
          <h2 className="text-center">Add New CRM Instance</h2>
          <Form>
            <label htmlFor="type">Instance Name:</label>
            <Field name="type" />
            <ErrorMsg name="type" />
            <label htmlFor="username">Username:</label>
            <Field name="username" />
            <ErrorMsg name="username" />
            <label htmlFor="password">Password:</label>
            <Field
              name="password"
              type="password"
              auto-complete="new-password"
            />
            <ErrorMsg name="password" />
            <label htmlFor="endpoint">JSON Endpoint:</label>
            <Field name="endpoint" as="textarea" />
            <ErrorMsg name="endpoint" className="col-start-2 col-span-2" />
            <label htmlFor="instanceprocessor">Processor Type:</label>
            <Field name="instanceprocessor" as="select">
              <option value="">Select Processor</option>
              <option value="Preprocessor">Pre-Processor</option>
              <option value="Postprocessor">Post-Processor</option>
            </Field>
            <ErrorMsg
              name="instanceprocessor"
              className="col-start-2 col-span-2"
            />
            <div className="flex items-center justify-end pt-2 gap-2">
              <div className="" onClick={() => testInstance()}>
                <MyButton
                  loading={testing}
                  loadingMsg="Testing"
                  action="Test Instance"
                  type="button"
                />
              </div>
              <MyButton
                loading={loading}
                loadingMsg="Adding"
                action="Register"
              />
            </div>
            <CurrentValues />
          </Form>
        </section>
      </Formik>
    </section>
  );
};

export default AddInstance;
