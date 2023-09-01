// Upload > Split > Sign > Zip > Post to slate > Download

const Steps = () => {
  const stepArr = ["Upload", "Split", "Sign", "Zip", "Post"];
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
      <div className="flex justify-between items-center">
        <Steps />
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 w-1/6 bg-indigo-400 rounded-full"></div>
      </div>
    </section>
  );
};
