import { ErrorIcon } from "@/assets/myIcons";
import Link from "next/link";

const NotAuthorized = () => {
  return (
    <main className="bg-indigo-200 h-screen text-center     py-16">
      <section className="bg-white rounded-2xl w-2/3 mx-auto flex flex-col items-center justify-center p-8 gap-2">
        <ErrorIcon className="w-20 h-20 text-red-600" />
        <h1 className="text-8xl font-black tracking-tight text-slate-700">
          Access Denied
        </h1>
        <p className="text-sm text-slate-600 underline py-2">
          You are not allowed to visit this page
        </p>
        <div className="py-2">
          <Link className="mr-2 button" href="/">
            Home
          </Link>
          <Link className="ml-2 button" href="/help">
            Help
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotAuthorized;
