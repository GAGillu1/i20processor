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
import React, { useState } from "react";
import { MyButton } from "@/components/utils/myInputs";
import { PreProcessingIcon } from "@/assets/myIcons";
import {
  PostProcessingCard,
  PreProcessingCard,
} from "@/components/utils/myCards";
import { motion } from "framer-motion";

// const Page = () => {
//   return (
//     <main className="bg-indigo-200 min-h-screen flex items-center justify-center gap-10">
//       <PreProcessingCard />
//       <PostProcessingCard />
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 64 64"
//         className="w-16 h-16"
//       >
//         <g id="_11-File_Sharing" data-name="11-File Sharing">
//           <path
//             className="cls-1"
//             d="M63 13a1 1 0 0 0-.28-.71l-12-12A1 1 0 0 0 50 0H12a3 3 0 0 0-3 3v28h2V3a1 1 0 0 1 1-1h37v9a3 3 0 0 0 3 3h9v47a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1V47H9v14a3 3 0 0 0 3 3h48a3 3 0 0 0 3-3V13zm-11-1a1 1 0 0 1-1-1V3.41L59.59 12z"
//           />
//           <path
//             className="cls-1"
//             d="M15 16h2v2h-2zM19 16h2v2h-2zM23 12V6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1zm-2-1h-4V7h4zM9 33h21v2H9zM9 43h21v2H9zM46.29 43.29l1.41 1.41 5-5a1 1 0 0 0 0-1.41l-5-5-1.41 1.41 3.3 3.3H4v2h45.59z"
//           />
//           <path
//             className="cls-1"
//             d="m48.71 58.71 5-5a1 1 0 0 0 0-1.41l-5-5-1.41 1.41L50.59 52H43v-7a2 2 0 0 0-2-2h-9v2h9v7a2 2 0 0 0 2 2h7.59l-3.29 3.29zM42 26v7H32v2h10a2 2 0 0 0 2-2v-7h6.59l-3.29 3.29 1.41 1.41 5-5a1 1 0 0 0 0-1.41l-5-5-1.41 1.41 3.29 3.3H44a2 2 0 0 0-2 2zM26 12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9h-2v2H28V9h-2zM26 5h2v2h-2zM30 5h2v2h-2zM34 5h10v2H34zM0 38h2v2H0zM5 33h2v2H5zM5 43h2v2H5z"
//           />
//         </g>
//       </svg>
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M20 4H4C2.89543 4 2 3.10457 2 2V22C2 20.8954 2.89543 19.9999 4 19.9999H20C21.1046 19.9999 22 20.8954 22 22V2C22 3.10457 21.1046 4 20 4Z"
//           fill="#212121"
//         />
//         <path
//           d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
//           fill="#212121"
//         />
//         <path
//           d="M14 10C14.5523 10 15 9.55228 15 9C15 8.44772 14.5523 8 14 8C13.4477 8 13 8.44772 13 9C13 9.55228 13.4477 10 14 10Z"
//           fill="#212121"
//         />
//         <path
//           d="M18 14C18.5523 14 19 13.5523 19 13C19 12.4477 18.5523 12 18 12C17.4477 12 17 12.4477 17 13C17 13.5523 17.4477 14 18 14Z"
//           fill="#212121"
//         />
//         <path
//           fill="white"
//           d="M12 18C13.1046 18 14 17.1045 14 16C14 14.8955 13.1046 14 12 14C10.8954 14 10 14.8955 10 16C10 17.1045 10.8954 18 12 18Z"
//         />
//       </svg>
//     </main>
//   );
// };

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
          <motion.div
            className="text-indigo-800 font-semibold"
            initial={{ opacity: 1, x: 400, scale: 2 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
          >
            <p className="leading-none">Welcome to,</p>
            <h1 className="text-9xl font-black tracking-tight">
              I-20 Processor
            </h1>
            <p>One stop for all the I-20 needs.</p>
          </motion.div>
        </div>
        <Formik
          initialValues={loginIV}
          validationSchema={loginSchema}
          onSubmit={(values) => postLogin(values)}
        >
          {
            <motion.section
              className="p-12 bg-gray-50  my-auto rounded-lg  font-semibold text-gray-700 w-[75%] col-span-2 justify-self-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
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
            </motion.section>
          }
        </Formik>
        {forgotPwd && <MyModal />}
      </div>
    </main>
  );
};

export default Page;
