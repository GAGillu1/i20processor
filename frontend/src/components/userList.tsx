"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { userModel } from "./utils/models";

const UserList = ({ userList }: { userList: userModel[] }) => {
  const searchParams = useSearchParams();

  return (
    <React.Fragment>
      {userList.length > 0
        ? userList.map((item: userModel) => (
            <Link
              key={item.username}
              className={
                "userItem " +
                `${
                  searchParams.get("user") === item.username
                    ? "bg-indigo-300"
                    : "bg-indigo-100"
                }`
              }
              href={"/admin/users/?user=" + item.username}
            >
              {item.fullname}
            </Link>
          ))
        : ""}
    </React.Fragment>
  );
};

export default UserList;
