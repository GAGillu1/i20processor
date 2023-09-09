"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { instanceModel } from "./utils/models";

const InstanceList = ({ ...props }) => {
  const searchParams = useSearchParams();
  const filteredList = props.userList.filter(
    (item: instanceModel) =>
      item.type?.toLowerCase().includes(props.search.toLowerCase())
  );

  return (
    <React.Fragment>
      {filteredList.length > 0 ? (
        filteredList.map((item: instanceModel) => (
          <Link
            key={item.type}
            className={
              "instanceItem " +
              `${
                searchParams.get("instance") === item.type
                  ? "bg-indigo-300"
                  : "bg-indigo-100"
              }`
            }
            href={"/admin/instance/?instance=" + item.type}
          >
            {item.type}
          </Link>
        ))
      ) : (
        <p className="text-sm tracking-wide text-slate-700">
          No Instances found!
        </p>
      )}
    </React.Fragment>
  );
};

export default InstanceList;
