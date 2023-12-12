"use client";
import { PreProcessingIcon } from "@/assets/myIcons";
import { HelperCard, preProcessorDesc } from "@/components/utils/myCards";
import Image from "next/image";
import preProcessorImage from "@/public/preProcessor.png";

const Page = () => {
  return (
    <main className="w-[95%] mx-auto">
      <HelperCard
        link="/i20/pre-processor"
        title="Pre-processor"
        description={preProcessorDesc}
      >
        <PreProcessingIcon className="w-16 h-16 text-indigo-900 mx-auto" />
        <Image
          src={preProcessorImage}
          objectFit="contain"
          alt="Pre-Processor Screenshot"
          className="rounded"
        />
        <ol className="list-decimal list-inside ">
          <li>
            Toggle VPN to active if network is outside campus. If VPN is active
            then
          </li>
          <li>
            Enter vpn username and password. Irrespective of VPN we need to
            enter
          </li>
          <li>
            below details. Instance can only be either “Prod” or “Test” Enter
            ISSM
          </li>
          <li>
            username and password If we need deferral i20 then tick the check
            box
          </li>
          <li>Upload the slate excel file from ready for i20 data.</li>
        </ol>
      </HelperCard>
    </main>
  );
};

export default Page;
