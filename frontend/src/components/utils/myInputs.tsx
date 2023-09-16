"use client";
import { useContextDispatch } from "../myContext";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
// -----------------------
// CUSTOM INPUT
export const MyInput = ({ ...props }) => {
  const dispatch = useContextDispatch();
  return (
    <select
      {...props}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        props.form.setFieldValue(props.field.name, e.target.value);
        dispatch({ type: "slateInput", data: e.target.value });
      }}
    />
  );
};
// -----------------------
// TextArea FOR FORMIK
export const MyTextArea = ({ ...props }) => {
  return (
    <textarea
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.form.setFieldValue(props.field.name, e.target.value);
      }}
      {...props}
    />
  );
};
// -----------------------
// CHECKBOX FOR FORMIK
export const MyCheckBox = ({ ...props }) => {
  return (
    <input
      type="checkbox"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.form.setFieldValue(props.field.name, e.target.value);
      }}
      {...props}
    />
  );
};
// -----------------------
// DSO CHECKBOX
export const DsoCheckBox = ({ ...props }) => {
  const dispatch = useContextDispatch();

  return (
    <input
      type="checkbox"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.form.setFieldValue(props.field.name, e.target.value);
        dispatch({ type: "dsoSign", data: e.target.checked });
      }}
      {...props}
    />
  );
};
// -----------------------
// FILE INPUT FOR FORMIK
export const FileInput = ({ ...props }) => {
  return (
    <input
      type="file"
      {...props}
      onChange={(e: any) => {
        props.form.setFieldValue(props.field.name, e.currentTarget.files[0]);
      }}
    />
  );
};

// -----------------------
// TOGGLE - HEADLESS UI
export const Toggle = ({ ...props }) => {
  console.log("props", props);
  const [enabled, setEnabled] = useState(props.active);
  const searchParams = useSearchParams();
  const usr = searchParams.get("user");
  // const toggleUser = async () => {
  //   try {
  //     const res = await fetch("/api/users/" + usr, {
  //       method: "DELETE",
  //     });
  //     if (!res.ok) throw res;
  //     const data = await res.json();
  //     setEnabled(!enabled);
  //     toast.success(data.message);
  //   } catch (err: any) {
  //     const data = await err.json();
  //     toast.error(data.message);
  //   }
  // };

  const toggleUser = () => {
    setEnabled(!enabled);
    props.form.setFieldValue(props.field.name, !enabled);
  };
  return (
    <div className="flex items-center justify-end gap-2">
      <label>{enabled ? "Active" : "Inactive"}</label>
      <div
        className={`group ${
          props.disabled ? "opacity-70 group-hover:transition-none" : ""
        }`}
      >
        <Switch
          checked={enabled}
          onChange={() => toggleUser()}
          className={`${
            enabled
              ? "bg-green-600 group-hover:bg-green-700"
              : "bg-red-600 group-hover:bg-red-700"
          } relative inline-flex h-6 w-12 items-center rounded-full transition duration-150`}
          disabled={props.disabled}
        >
          <span className="sr-only">{props.name}</span>
          <span
            className={`${
              enabled ? "translate-x-3" : "-translate-x-3"
            } inline-block h-4 w-4 transform rounded-full bg-white transition group-hover:scale-125 duration-150`}
          />
        </Switch>
      </div>
    </div>
  );
};
// -----------------------
// SUBMIT BUTTON
export const MySubmit = ({ ...props }) => {
  return props.hidden ? (
    ""
  ) : (
    <button type="submit" disabled={props.loading}>
      <span
        className="animate-ping w-2 h-2 bg-indigo-700 rounded-full absolute"
        hidden={!props.loading}
      />
      <span
        className="w-2 h-2 bg-indigo-900 rounded-full"
        hidden={!props.loading}
      />
      {!props.loading && props.children}
      {props.loading ? `${props.loadingMsg}` : `${props.action}`}
    </button>
  );
};
