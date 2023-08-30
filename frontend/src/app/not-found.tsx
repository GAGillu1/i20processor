import { ErrorIcon } from "@/assets/myIcons";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="bg-indigo-200 h-screen text-center     py-16">
      <section className="bg-white rounded-2xl w-2/3 mx-auto flex flex-col items-center justify-center p-8 gap-2">
        <h1 className="text-8xl font-black tracking-tight text-slate-700">
          <span className="text-red-600 block">404</span>
          Page Not Found!
        </h1>
        <p className="text-sm text-slate-600 underline py-2">
          We are sorry, but the page you requested was not found
        </p>
        <div className="py-2">
          <Link className="mr-2 button" href="/">
            Home
          </Link>
          <Link className="ml-2 button" href="/support">
            Support
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
