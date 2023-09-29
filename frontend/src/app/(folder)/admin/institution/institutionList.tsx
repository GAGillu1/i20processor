"use client";
import { institutionModel } from "@/components/utils/models";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";

const InstitutionList = ({ ...props }) => {
  const searchParams = useSearchParams();
  const filteredList = props.institutionList.filter(
    (item: institutionModel) =>
      item.institutionName
        ?.toLowerCase()
        .includes(props.search.toLowerCase()) ||
      props.filter === item.institutionName
  );
  return (
    <React.Fragment>
      {filteredList.length > 0 ? (
        filteredList.map((item: institutionModel) => (
          <Link
            key={item.institutionName}
            className={
              "listItem " +
              `${
                searchParams.get("institution") === item.institutionName
                  ? "bg-indigo-300"
                  : "bg-indigo-100"
              }`
            }
            href={"/admin/institution/?institution=" + item.institutionName}
          >
            {item.institutionName}
          </Link>
        ))
      ) : (
        <p className="text-sm tracking-wide text-slate-700">
          No Institutions found!
        </p>
      )}
    </React.Fragment>
  );
};

export default InstitutionList;
