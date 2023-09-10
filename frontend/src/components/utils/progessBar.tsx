// Upload > Split > Sign > Zip > Post to slate > Download

import React from "react";
import { useMyContext } from "../myContext";

const progress = ["1", "w-1/6", "w-2/6", "w-3/6", "w-4/6", "w-5/6"];
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
  return bannerArr.map((item, i) => {
    return (
      <div className="col-span-3" key={i}>
        <p className="font-semibold">{item}</p>
        <p className="col-span-2">All Good</p>
      </div>
    );
  });
};

const stepArr = ["Uploading", "Splitting", "Signing", "Zipping", "Posting"];
const Steps = () => {
  return stepArr.map((step, i) => {
    return (
      <div
        className=" text-center flex flex-col items-center justify-center text-indigo-900 font-semibold gap-2"
        key={i}
      >
        <div className="w-10 h-10 rounded-full bg-indigo-300 p-2">{i + 1}</div>
        <p>{step}</p>
      </div>
    );
  });
};

export const ProgressBar = () => {
  return (
    <section className="section">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-around items-center ">
          <Steps />
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
          <div
            className={"h-2 bg-indigo-400 rounded-full " + `w-${progress[1]}`}
          />
        </div>
      </div>
    </section>
  );
};

export const ProgressBar1 = () => {
  const data = useMyContext();
  return (
    <section className="section">
      <div className="w-[90%] mx-auto">
        <h3 className="animate-pulse text-center">{`${
          stepArr[data.responseData]
        }`}</h3>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
          <div
            className={
              `h-2 animate-pulse bg-indigo-400 rounded-full ` +
              `${progress[data.responseData]}`
            }
          />
        </div>
      </div>
    </section>
  );
};

export const Response = () => {
  return (
    <section className="w-[90%] mx-auto">
      <h2 className="formHeader">Results</h2>
      <div className="grid grid-cols-3 gap-y-2 items-center">
        <Results />
      </div>
    </section>
  );
};
