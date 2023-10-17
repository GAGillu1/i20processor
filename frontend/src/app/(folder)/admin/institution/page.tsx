"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/(folder)/admin/users/loading";
import { Suspense } from "react";
import { sParams, userModel } from "@/components/utils/models";
import { AddIcon, LogsIcon, SearchIcon } from "@/assets/myIcons";
import { toast } from "react-hot-toast";
import InstitutionList from "./institutionList";
import InstitutionInfo from "./institutionInfo";
import AddUniversity from "./addInstitution";
import InstitutionLogs from "./institutionLogs";

const Institution = ({ searchParams }: sParams) => {
  const [institutionList, setInstitutionList] = useState<userModel[]>([]);
  const [findInstitution, setFindInstitution] = useState("");
  const showInstitution = searchParams?.institution;
  const showAddInstitution = !showInstitution;
  const showLogs = searchParams?.logs;

  useEffect(() => {
    !showLogs && getUniversityList();
  }, [showLogs]);

  const getUniversityList = async () => {
    try {
      const res = await fetch("/api/institution");
      if (!res.ok) throw res;
      const data = await res.json();
      setInstitutionList(data.data);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    }
  };

  return showLogs ? (
    <InstitutionLogs />
  ) : (
    <main className="w-[95%] mx-auto">
      <h1 className=" p-4 font-bold text-slate-700 text-xl">
        Institution List
      </h1>
      <section className="grid grid-cols-2 gap-2 h-[70vh]">
        <div className="bg-white rounded-lg px-4 pb-4 pt-2">
          <div className="flex gap-2 justify-between">
            <Link
              href="/admin/institution"
              className="navLink bg-indigo-100 w-44 text-center text-indigo-900"
            >
              <AddIcon />
              Add Institution
            </Link>

            <Link
              href="/logs"
              className="navLink bg-indigo-100 w-24 text-center text-indigo-900"
            >
              <LogsIcon />
              Logs
            </Link>
          </div>
          <div className="my-2 bg-slate-200 h-1 rounded-full" />
          <div className="group">
            <div className="searchBar">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search Institution ..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFindInstitution(e.target.value)
                }
              />
            </div>
          </div>
          <ul className="flex flex-col gap-2 mt-4 overflow-y-auto h-[55vh]">
            <InstitutionList
              institutionList={institutionList}
              search={findInstitution}
            />
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 ">
          {showInstitution && (
            <Suspense fallback={<Loading />}>
              <InstitutionInfo />
            </Suspense>
          )}
          {showAddInstitution && (
            <Suspense fallback={<Loading />}>
              <AddUniversity />
            </Suspense>
          )}
        </div>
      </section>
    </main>
  );
};

export default Institution;
