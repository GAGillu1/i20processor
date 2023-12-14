"use client";
import { userModel } from "@/components/utils/models";
import { AnimationVariants as ListAnimationVariants } from "@/components/utils/variants";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";

const UserList = ({ ...props }) => {
  const searchParams = useSearchParams();
  const filteredList = props.userList.filter(
    (item: userModel) =>
      item.fullname?.toLowerCase().includes(props.search.toLowerCase())
  );
  return (
    <React.Fragment>
      {filteredList.length > 0 ? (
        filteredList.map((item: userModel) => (
          <Link
            key={item.username}
            className={
              "listItem " +
              `${
                searchParams.get("user") === item.email
                  ? "bg-indigo-300"
                  : "bg-indigo-100"
              }`
            }
            href={"/admin/users/?user=" + item.email}
          >
            <motion.div variants={ListAnimationVariants.card}>
              {item.fullname}
            </motion.div>
          </Link>
        ))
      ) : (
        <p className="text-sm tracking-wide text-slate-700">No Users found!</p>
      )}
    </React.Fragment>
  );
};

export default UserList;
