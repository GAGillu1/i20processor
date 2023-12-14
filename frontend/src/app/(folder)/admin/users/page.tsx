"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/(folder)/admin/users/loading";
import { Suspense } from "react";
import { sParams, userModel } from "@/components/utils/models";
import { AddIcon, SearchIcon } from "@/assets/myIcons";
import AddSign from "@/app/(folder)/admin/users/addSign";
import { toast } from "react-hot-toast";
import UserInfo from "./userInfo";
import AddUser from "./addUser";
import UserList from "./userList";
import { motion } from "framer-motion";
import { ListAnimationVariants } from "@/components/utils/variants";

const Users = ({ searchParams }: sParams) => {
  const [userList, setUserList] = useState<userModel[]>([]);
  const [findUser, setFindUser] = useState("");
  const showModal = searchParams?.addSign;
  const showUser = searchParams?.user && !showModal;
  const institution = searchParams?.institution;
  const showAddUser = !(showModal || showUser);

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserList = async () => {
    try {
      const res = await fetch("/api/users", {
        headers: institution ? { institutionId: institution } : {},
      });

      if (!res.ok) throw res;
      const data = await res.json();
      setUserList(data.data);
      // console.log("userList", data);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    }
  };

  return (
    <motion.main
      className="w-[95%] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className=" p-4 font-bold text-slate-700 text-xl">
        {institution ? institution : ""} User List
      </h1>
      <section className="grid grid-cols-2 gap-2 h-[70vh]">
        <div className="bg-white rounded-lg p-4">
          <Link
            href="/admin/users"
            className="navLink bg-indigo-100 w-32 text-center text-indigo-900"
          >
            <AddIcon />
            Add User
          </Link>
          <div className="my-2 bg-slate-200 h-1 rounded-full" />
          <div className="group">
            <div className="searchBar">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search User..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFindUser(e.target.value)
                }
              />
            </div>
          </div>
          <motion.ul
            className="flex flex-col gap-2 mt-4 overflow-y-auto h-[55vh]"
            initial="initial"
            animate="animate"
            variants={ListAnimationVariants.container}
          >
            <UserList userList={userList} search={findUser} />
          </motion.ul>
        </div>

        <div className="bg-white rounded-lg p-4 ">
          {showUser && (
            <Suspense fallback={<Loading />}>
              <UserInfo />
            </Suspense>
          )}
          {showAddUser && (
            <Suspense fallback={<Loading />}>
              <AddUser />
            </Suspense>
          )}
          {showModal && (
            <Suspense fallback={<Loading />}>
              <AddSign />
            </Suspense>
          )}
        </div>
      </section>
    </motion.main>
  );
};

export default Users;
