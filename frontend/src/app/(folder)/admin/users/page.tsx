"use client";
import UserList from "@/components/userList";
import UserInfo from "@/components/userInfo";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/(folder)/admin/users/loading";
import { Suspense } from "react";
import AddUser from "@/components/addUser";
import { sParams, userModel } from "@/components/utils/models";
import { AddIcon, SearchIcon } from "@/assets/myIcons";
import AddSign from "@/components/addSign";

const Users = ({ searchParams }: sParams) => {
  const [userList, setUserList] = useState<userModel[]>([]);
  const showAddUser = searchParams?.addUser;
  const showModal = searchParams?.addSign;
  const showUser = searchParams?.user && !showModal;

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () =>
    await fetch("/api/users")
      .then((res) => res.json())
      .then((list) => setUserList(list.data));

  return (
    <main className="w-[95%] mx-auto">
      <h1 className=" p-4 font-bold text-slate-700 text-xl">User List</h1>
      <section className="grid grid-cols-2 gap-2  min-h-[70vh]">
        <div className="bg-white rounded-lg p-4">
          <Link
            href="/admin/users?addUser=true"
            className="navLink bg-indigo-100 w-32 text-center text-indigo-900"
          >
            <AddIcon />
            Add User
          </Link>
          <div className="my-2 bg-slate-200 h-1 rounded-full" />
          <div className="group">
            <div className="searchBar">
              <SearchIcon />
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <ul className="flex flex-col gap-2 mt-4">
            <UserList userList={userList} />
          </ul>
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
    </main>
  );
};

export default Users;
