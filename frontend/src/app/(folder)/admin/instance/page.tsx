"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/(folder)/admin/users/loading";
import { Suspense } from "react";
import { instanceModel, sParams } from "@/components/utils/models";
import { AddIcon, SearchIcon } from "@/assets/myIcons";
import AddInstance from "@/components/addInstance";
import InstanceList from "@/components/instanceList";
import InstanceInfo from "@/components/instanceInfo";
import { toast } from "react-hot-toast";

const Users = ({ searchParams }: sParams) => {
  const [findInstance, setFindInstance] = useState("");
  const [instanceList, setInstanceList] = useState<instanceModel[]>([]);
  const showAddInstance = searchParams?.addInstance;
  const showInstance = searchParams?.instance;

  useEffect(() => {
    getInstanceList();
  }, []);

  const getInstanceList = async () => {
    try {
      const res = await fetch("/api/instance");
      if (!res.ok) throw res;
      const data = await res.json();
      setInstanceList(data.data);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    }
  };

  return (
    <main className="w-[95%] mx-auto">
      <h1 className=" p-4 font-bold text-slate-700 text-xl">Instance List</h1>
      <section className="grid grid-cols-2 gap-2  min-h-[70vh]">
        <div className="bg-white rounded-lg p-4">
          <Link
            href="/admin/instance?addInstance=true"
            className="navLink bg-indigo-100 w-44 text-center text-indigo-900"
          >
            <AddIcon />
            Add Instance
          </Link>
          <div className="my-2 bg-slate-200 h-1 rounded-full" />
          <div className="group">
            <div className="searchBar">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search Instance..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFindInstance(e.target.value)
                }
              />
            </div>
          </div>
          <ul className="flex flex-col gap-2 mt-4 overflow-y-auto h-[55vh]">
            <InstanceList instanceList={instanceList} search={findInstance} />
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 ">
          {showInstance && (
            <Suspense fallback={<Loading />}>
              <InstanceInfo />
            </Suspense>
          )}
          {showAddInstance && (
            <Suspense fallback={<Loading />}>
              <AddInstance />
            </Suspense>
          )}
        </div>
      </section>
    </main>
  );
};

export default Users;
