"use client";
import { useContextDispatch } from "./myContext";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import PhoneInput from "react-phone-input-2";
import { usePathname } from "next/navigation";
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
  const [enabled, setEnabled] = useState(props.active);
  const path = usePathname();
  const toggleActive = () => {
    setEnabled(!enabled);
    props.form.setFieldValue(props.field.name, !enabled);
  };
  return (
    <div className="flex items-center justify-end gap-2 ">
      <label>{enabled ? "Active" : "Inactive"}</label>
      <div
        className={`group ${
          props.disabled ? "opacity-70 group-hover:transition-none" : ""
        }`}
      >
        <Switch
          checked={enabled}
          onChange={() => toggleActive()}
          className={`${
            enabled
              ? props.disabled
                ? "bg-green-600 group-hover:bg-green-600"
                : "bg-green-600 group-hover:bg-green-700"
              : props.disabled
              ? "bg-red-600 group-hover:bg-red-600"
              : "bg-red-600 group-hover:bg-red-700"
          }
          
          relative inline-flex h-6 w-12 items-center rounded-full transition duration-150`}
          disabled={props.disabled}
        >
          <span className="sr-only">{props.name}</span>
          <span
            className={`${
              enabled ? "translate-x-3" : "-translate-x-3"
            } inline-block h-4 w-4 transform rounded-full bg-white transition ${
              props.disabled ? "" : "group-hover:scale-125"
            } duration-150`}
          />
        </Switch>
      </div>
    </div>
  );
};
// -----------------------
// SUBMIT BUTTON
export const MySubmit = ({ ...props }) => {
  return (
    !props.hidden && (
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
    )
  );
};
// -----------------------
// PHONE INPUT
export const PhInput = ({ ...props }) => {
  return (
    <PhoneInput
      country={"us"}
      specialLabel=""
      isValid={true}
      defaultErrorMessage="Please enter a valid phone number"
      onChange={(phone: string) => {
        props.form.setFieldValue(props.field.name, phone);
      }}
      {...props}
    />
  );
};
