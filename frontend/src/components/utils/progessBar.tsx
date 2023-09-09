// Upload > Split > Sign > Zip > Post to slate > Download

const progress = ["1", "1/6", "2/6", "4/6", "5/6", "full"];
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
  return (
    <section className="section">
      <div className="w-[90%] mx-auto">
        <h3 className="animate-pulse text-center">{`${stepArr[1]}`}</h3>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
          <div
            className={
              "h-2 animate-pulse bg-indigo-400 rounded-full " + `w-1/2`
            }
          />
        </div>
      </div>
    </section>
  );
};

const Response = () => {};
