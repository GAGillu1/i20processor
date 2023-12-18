// Upload > Split > Sign > Zip > Post to slate > Download

import React, { useEffect, useState } from "react";
import { useMyContext } from "./myContext";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const progress = ["w-1/6", "w-2/6", "w-3/6", "w-4/6", "w-full", "w-full"];

const postBannerArr = [
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

const preBannerArr = [
  "Total:",
  "Processed:",
  "Success:",
  "Failure:",
  "Deferral:",
];

const postArr = [
  "Uploading",
  "Splitting & Signing",
  "Creating Index File",
  "Zipping",
  "Downloading",
  "Downloading & Posting",
];
const preArr = [
  "Loading",
  "Uploading",
  "Validating VPN Credentials",
  "VPN login Success",
  "ISSM login Validation",
  "ISSM Login Success",
];

const Results = () => {
  const [results, setResults] = useState([]);
  const path = usePathname();
  const bannerArr =
    path === "/i20/pre-processor" ? preBannerArr : postBannerArr;
  const api = "/api" + path;
  const getResults = async () => {
    try {
      const res = await fetch(api);
      console.log("res status", res.status);
      if (!res.ok) throw res;
      const data = await res.json();
      console.log(data);
      console.log(Object.values(data.data));
      setResults(Object.values(data.data));
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getResults();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    results.length > 0 &&
    bannerArr.map((item, i) => {
      return (
        results[i] && (
          <React.Fragment key={i}>
            <p className="font-semibold">{item}</p>
            <p className="col-span-2">{results[i]}</p>
          </React.Fragment>
        )
      );
    })
  );
};

export const ProgressBar = () => {
  const data = useMyContext();
  const path = usePathname();
  const method = data.preProcessorMethod;
  const threshold = method === 2 ? 1 : 6;
  const offset = method === 2 ? 0 : 5;

  return path === "/i20/pre-processor" ? (
    <PreProcessorProgressBar threshold={threshold} offset={offset} />
  ) : (
    <PostProcessorProgressBar />
  );
};

const PreProcessorProgressBar = ({
  offset,
  threshold,
}: {
  offset: number;
  threshold: number;
}) => {
  const data = useMyContext();
  const status = data.preProcessStatus;
  const maxCount = data.preProcessMaxCount + offset;
  const progressText =
    "Processing " + (status - offset) + "/" + (maxCount - offset);
  const p = Math.floor((status / maxCount) * 100);
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="w-[90%] mx-auto">
        <h3 className="animate-pulse text-center">{`${
          status < threshold ? preArr[status] : progressText
        }`}</h3>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
          <div
            className={`h-2 animate-pulse bg-indigo-400 rounded-full `}
            style={{ width: `${p}%` }}
          />
        </div>
      </div>
    </motion.section>
  );
};
const PostProcessorProgressBar = () => {
  const data = useMyContext();
  const status = Math.abs(data.postProcessStatus);

  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
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
    </motion.section>
  );
};

export const Response = () => {
  const path = usePathname();
  return (
    <motion.section
      className="w-[90%] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="formHeader">Results</h2>
      <div className="grid grid-cols-3 gap-y-2">
        <Results />
      </div>
      <div className="flex justify-center gap-4 items-center mt-4">
        <Link href={path}>
          <button>Done</button>
        </Link>
        <Link href={"/logs"}>
          <button>Logs</button>
        </Link>
      </div>
    </motion.section>
  );
};
