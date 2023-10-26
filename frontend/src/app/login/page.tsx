"use client";
import { Field, Form, Formik } from "formik";
import ErrorMsg from "@/components/utils/errorMsg";
import { loginSchema } from "@/components/utils/valSchemas";
import { loginIV } from "@/components/utils/initialValues";
import { useRouter } from "next/navigation";
import { loginModel } from "@/components/utils/models";
import { useContextDispatch } from "@/components/utils/myContext";
import toast from "react-hot-toast";
import Link from "next/link";
import MyModal from "@/components/ui/forgotPwd";
import { useState } from "react";
import { MyButton } from "@/components/utils/myInputs";

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
    <main className="  bg-indigo-200 ">
      <div className="grid grid-cols-5 w-[90%] min-h-screen mx-auto">
        <div className="col-span-3 flex items-center ">
          <div className="text-indigo-800 font-semibold">
            <p className="leading-none">Welcome to,</p>
            <h1 className="text-9xl font-black tracking-tight">
              I-20 Processor
            </h1>
            <p>One stop for all the I-20 needs.</p>
          </div>
        </div>
        <Formik
          initialValues={loginIV}
          validationSchema={loginSchema}
          onSubmit={(values) => postLogin(values)}
        >
          {
            <section className="p-12 bg-gray-50  my-auto rounded-lg  font-semibold text-gray-700 w-[75%] col-span-2 justify-self-end">
              <h2 className="text-5xl mb-6 px-0">Login</h2>
              <Form className="flex flex-col gap-1">
                <label htmlFor="username">Email</label>
                <Field name="username" placeholder="john12@xyz.com" autoFocus />
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

                  <MyButton
                    loading={loading}
                    loadingMsg="Processing"
                    action="Login"
                  />
                </div>
              </Form>
            </section>
          }
        </Formik>
        {forgotPwd && <MyModal />}
      </div>
    </main>
  );
};

export default Page;
