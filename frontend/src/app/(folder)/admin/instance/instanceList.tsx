"use client";
import { instanceModel } from "@/components/utils/models";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";

const InstanceList = ({ ...props }) => {
  const searchParams = useSearchParams();
  const filteredList = props.instanceList.filter(
    (item: instanceModel) =>
      item.type?.toLowerCase().includes(props.search.toLowerCase()) ||
      props.filter === item.endpoint
  );

  return (
    <React.Fragment>
      {filteredList.length > 0 ? (
        filteredList.map((item: instanceModel) => (
          <Link
            key={item.type}
            className={
              "listItem " +
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
