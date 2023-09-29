"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/(folder)/admin/users/loading";
import { Suspense } from "react";
import { instanceModel, sParams } from "@/components/utils/models";
import { AddIcon, SearchIcon } from "@/assets/myIcons";
import AddInstance from "@/app/(folder)/admin/instance/addInstance";
import { toast } from "react-hot-toast";
import InstanceList from "./instanceList";
import InstanceInfo from "./instanceInfo";

const Users = ({ searchParams }: sParams) => {
  const [findInstance, setFindInstance] = useState("");
  const [instanceList, setInstanceList] = useState<instanceModel[]>([]);
  const [filter, setFilter] = useState("");
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
          <div className="flex justify-between gap-2">
            <Link
              href="/admin/instance?addInstance=true"
              className="navLink w-56 bg-indigo-100  text-center text-indigo-900"
            >
              <AddIcon />
              Add Instance
            </Link>
            <select
              name="filter"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFilter(e.target.value)
              }
              id="filter"
            >
              <option value="">Select Filter...</option>
              <option value="pre">Pre-Processor</option>
              <option value="post">Post-Processor</option>
            </select>
          </div>
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
            <InstanceList
              instanceList={instanceList}
              search={findInstance}
              filter={filter}
            />
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
