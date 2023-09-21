// Upload > Split > Sign > Zip > Post to slate > Download

import React, { useEffect, useState } from "react";
import { useMyContext } from "../myContext";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import Link from "next/link";

const progress = [
  "w-[5%]",
  "w-1/6",
  "w-2/6",
  "w-3/6",
  "w-4/6",
  "w-5/6",
  "w-full",
];
const bannerArr = [
  "Add Sign:",
  "Split Failure:",
  "Total Files:",
  "Total Pages:",
  "Total Signatures:",
  "Index Error:",
  "Index Size:",
  "Index Msg:",
  "Missing Records:",
  "Sign Message:",
  "Split Message",
  "Zip Message:",
];

const Results = () => {
  const [results, setResults] = useState([]);
  const path = usePathname();
  const api = "/api" + path;
  const getResults = async () => {
    try {
      const res = await fetch(api);
      if (!res.ok) throw res;
      const data = await res.json();
      setResults(data.data);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return results
    ? bannerArr.map((item, i) => {
        return results[i] ? (
          <React.Fragment key={i}>
            <p className="font-semibold">{item}</p>
            <p className="col-span-2">{results[i]}</p>
          </React.Fragment>
        ) : (
          ""
        );
      })
    : "";
};

const postArr = ["Uploading", "Splitting", "Signing", "Zipping", "Posting"];
const preArr = [
  "Loading",
  "Uploading",
  "Validating VPN Credentials",
  "VPN login Success",
  "ISSM login Validation",
  "ISSM Login Success",
];
// const Steps = () => {
//   return stepArr.map((step, i) => {
//     return (
//       <div
//         className=" text-center flex flex-col items-center justify-center text-indigo-900 font-semibold gap-2"
//         key={i}
//       >
//         <div className="w-10 h-10 rounded-full bg-indigo-300 p-2">{i + 1}</div>
//         <p>{step}</p>
//       </div>
//     );
//   });
// };

export const ProgressBar = () => {
  const path = usePathname();
  return path === "/i20/pre-processor" ? (
    <PreProcessorProgressBar />
  ) : (
    <PostProcessorProgressBar />
  );
};

const PreProcessorProgressBar = () => {
  const data = useMyContext();
  const status = data.preProcessStatus;
  const maxCount = data.preProcessMaxCount + 5;
  const progressText = "Processed " + (status - 5) + "/" + (maxCount - 5);
  const p = Math.floor((status / maxCount) * 100);

  return (
    <section className="section">
      <div className="w-[90%] mx-auto">
        <h3 className="animate-pulse text-center">{`${
          status < 6 ? preArr[status] : progressText
        }`}</h3>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
          <div
            className={`h-2 animate-pulse bg-indigo-400 rounded-full `}
            style={{ width: `${p}%` }}
          />
        </div>
      </div>
    </section>
  );
};
const PostProcessorProgressBar = () => {
  const data = useMyContext();
  const status = Math.abs(data.postProcessStatus);

  return (
    <section className="section">
      <div className="w-[90%] mx-auto">
        <h3 className="animate-pulse text-center">{`${postArr[status]}`}</h3>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
          <div
            className={
              `h-2 animate-pulse bg-indigo-400 rounded-full ` +
              `${progress[status]}`
            }
          />
        </div>
      </div>
    </section>
  );
};

export const Response = () => {
  const path = usePathname();
  return (
    <section className="w-[90%] mx-auto">
      <h2 className="formHeader">Results</h2>
      <div className="grid grid-cols-3 gap-y-2">
        <Results />
      </div>
      <div className="flex justify-center items-center mt-4">
        <Link href={path}>
          <button>Got it!</button>
        </Link>
      </div>
    </section>
  );
};
