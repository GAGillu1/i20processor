"use client";
/* eslint-disable react/no-unescaped-entities */
import { UsersIcon } from "@/assets/myIcons";
import { HelperCard, instanceDesc } from "@/components/utils/myCards";
import Image from "next/image";
import addInstanceImage from "@/public/addInstance.png";
import instanceInfoImage from "@/public/instanceInfo.png";

const Page = () => {
  return (
    <main className="w-[95%] mx-auto">
      <HelperCard title="Instance" description={instanceDesc}>
        <UsersIcon className="w-16 h-16 text-indigo-900 mx-auto" />
        <div className="">
          <Image
            src={addInstanceImage}
            objectFit="contain"
            alt="Add Instance Screenshot"
            className="rounded w-full"
          />
          <Image
            src={instanceInfoImage}
            objectFit="contain"
            alt="Instance Info Screenshot"
            className="rounded w-full my-2"
          />
        </div>
        <ul>
          <li>
            <span className="font-semibold"> Add Instance:</span>
            <ol className="list-decimal list-inside pl-4">
              <li>Fill in Instance Name.</li>
              <li>Enter valid username.</li>
              <li>Populate valid password.</li>
              <li>Save JSON Endpoint value in the field.</li>
              <li>Select processor type (Post-Processor or Pre-Processor).</li>
              <li>
                You can Test Instance, and if working as expected, click on
                Register.
              </li>
            </ol>
          </li>
          <li>
            <span className="font-semibold">Filter Instance:</span>
            <ul className="pl-4">
              <li>
                Select either pre-processor or post-processor in dropdown.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">View Instance:</span>
            <ol className="list-decimal list-inside pl-4">
              <li>Click on the instance you want to edit.</li>
              <li>You can edit either the username or password.</li>
              <li>Click on save to persist data.</li>
            </ol>
          </li>
        </ul>
      </HelperCard>
    </main>
  );
};

export default Page;
