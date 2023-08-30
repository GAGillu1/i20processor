import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import * as React from "react";

export default function MyPrompt(
  show: boolean | any,
  {
    children,
  }: {
    children: React.ReactNode;
  }
) {
  let [isShowing, setIsShowing] = useState(true);
  useEffect(() => {
    if (show === true) {
      console.log("In SHOW");
      setIsShowing(true);
      setTimeout(() => {
        setIsShowing(false);
      }, 3000);
    }
  }, [show]);
  return (
    <div className="">
      <div className="">
        <Transition
          as={"div"}
          show={isShowing}
          enter="transform transition duration-[400ms] translate"
          enterFrom="opacity-0 translate-x-12  scale-50"
          enterTo="opacity-100 rotate-0 scale-100 translate-x-0"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100 "
          leaveTo="opacity-0 scale-95 "
        >
          {children}
        </Transition>
      </div>
    </div>
  );
}
