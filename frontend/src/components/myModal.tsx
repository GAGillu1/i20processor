import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { forgotPwdIV } from "./utils/initialValues";
import { forgotPwdSchema } from "./utils/valSchemas";
import ErrorMsg from "./errorMsg";
import { useRouter } from "next/navigation";
import getFormData from "./utils/getFormData";
import { toast } from "react-hot-toast";
import { userModel } from "./utils/models";

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

export default function MyModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [response, setResponse] = useState({});

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => router.push("/login"), 200);
  }

  async function forgotPwd(values: userModel) {
    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "PUT",
        body: getFormData(values),
      });
      if (!res.ok) throw res;
      const data = await res.json();
      toast.success(data.message);
      router.push("/login");
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  }
  // useEffect(() => {
  //   getResponse();
  // }, []);

  // const getResponse = async () => {
  //   fetch("http://127.0.0.1:8081/getResponse")
  //     .then((response) => response.json())
  //     .then((res) => {
  //       console.log(res);
  //       setResponse(res);
  //     });
  // };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium text-gray-800 leading-6 mb-2"
                  >
                    Forgot Password?
                  </Dialog.Title>
                  <div className="py-2">
                    <Formik
                      initialValues={forgotPwdIV}
                      validationSchema={forgotPwdSchema}
                      onSubmit={(values) => forgotPwd(values)}
                    >
                      <Form>
                        <label htmlFor="username">Username</label>
                        <Field
                          name="username"
                          placeholder="john12"
                          autoFocus
                          className="my-1"
                        />
                        <ErrorMsg name="username" />
                        <button type="submit" className="my-2">
                          <span
                            className="animate-ping w-2 h-2 bg-indigo-700 rounded-full absolute"
                            hidden={!loading}
                          />
                          <span
                            className=" w-2 h-2 bg-indigo-900 rounded-full"
                            hidden={!loading}
                          />
                          {loading ? "Sending" : "Send My Password"}
                        </button>
                      </Form>
                    </Formik>
                    <Dialog.Description
                      as="p"
                      className={"text-sm text-slate-700"}
                    >
                      The new password will be sent to your email address.
                    </Dialog.Description>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
