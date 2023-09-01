"use client";
import { useContextDispatch } from "../myContext";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
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
  return <input type="checkbox" {...props} />;
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
  const [enabled, setEnabled] = useState(true);
  const searchParams = useSearchParams();
  const usr = searchParams.get("user");
  const toggleUser = async () => {
    try {
      const body = { username: usr, status: enabled };
      const res = await fetch("/api/users", {
        method: "DELETE",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw res;
      const data = await res.json();
      setEnabled(!enabled);
      toast.success(data.message);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    }
  };
  return (
    <div className="flex items-center justify-end gap-2">
      <label>{enabled ? "Active" : "Inactive"}</label>
      <div className="group ">
        <Switch
          checked={enabled}
          onChange={toggleUser}
          className={`${
            enabled
              ? "bg-green-600 group-hover:bg-green-700"
              : "bg-red-600 group-hover:bg-red-700"
          } relative inline-flex h-6 w-12 items-center rounded-full transition duration-150`}
          name="isActive"
          value="checked"
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
