"use client";
import { Field, Form, Formik } from "formik";
import ErrorMsg from "@/components/errorMsg";
import { loginSchema } from "@/components/utils/valSchemas";
import { loginIV } from "@/components/utils/initialValues";
import { useRouter } from "next/navigation";
import { loginModel } from "@/components/utils/models";
import { useContextDispatch } from "@/components/myContext";
import toast from "react-hot-toast";
import Link from "next/link";
import MyModal from "@/components/myModal";
import { useEffect, useState } from "react";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const dispatch = useContextDispatch();
  const forgotPwd = searchParams["forgotPassword"];

  const [loading, setLoading] = useState(false);

  async function postLogin(values: loginModel) {
    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + btoa(`${values.username}:${values.password}`),
        },
      });
      if (!res.ok) throw res;
      const data = await res.json();
      console.log("User data", data);
      toast.success(data.message);
      dispatch({ type: "login", action: data.data });
      router.push("/");
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid grid-cols-3 min-h-screen bg-indigo-200">
      <div className="col-span-2 flex items-center justify-center">
        <div className="text-indigo-800 font-semibold">
          <p className="leading-none">Welcome to,</p>
          <h1 className="text-9xl font-black tracking-tight">I-20 Processor</h1>
          <p>One stop for all the I20 needs.</p>
        </div>
      </div>
      <Formik
        initialValues={loginIV}
        validationSchema={loginSchema}
        onSubmit={(values) => postLogin(values)}
      >
        {
          <section className="p-12 bg-gray-50 max-h-[60%] my-auto rounded-lg w-[90%] font-semibold text-gray-700">
            <h2 className="text-5xl py-6">Login</h2>
            <Form className="flex flex-col gap-1">
              <label htmlFor="username">Username</label>
              <Field name="username" placeholder="john12" autoFocus />
              <ErrorMsg name="username" />
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMsg name="password" />
              <div className="flex justify-between items-center mt-4">
                <Link
                  className="underline text-sm text-slate-700 font-normal"
                  href={"/login?forgotPassword=true"}
                >
                  Forgot Password?
                </Link>
                <button type="submit">
                  <span
                    className="animate-ping w-2 h-2 bg-indigo-700 rounded-full absolute"
                    hidden={!loading}
                  />
                  <span
                    className=" w-2 h-2 bg-indigo-900 rounded-full"
                    hidden={!loading}
                  />
                  {loading ? "Processing" : "Login"}
                </button>
              </div>
            </Form>
          </section>
        }
      </Formik>
      {forgotPwd && <MyModal />}
    </main>
  );
};

export default Page;