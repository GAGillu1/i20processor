"use client";
/* eslint-disable react/no-unescaped-entities */
import { PostProcessingIcon } from "@/assets/myIcons";
import { HelperCard, postProcessorDesc } from "@/components/utils/myCards";
import Image from "next/image";
import postProcessorImage from "@/public/postProcessor.png";

const Page = () => {
  return (
    <main className="w-[95%] mx-auto">
      <HelperCard
        link="/i20/post-processor"
        title="Post-processor"
        description={postProcessorDesc}
      >
        <PostProcessingIcon className="w-16 h-16 text-indigo-900 mx-auto" />
        <Image
          src={postProcessorImage}
          objectFit="contain"
          alt="Post-Processor Screenshot"
          className="rounded"
        />
        <ol className="list-inside list-decimal">
          <li>Select I20 type required to be processed.</li>
          <li>Select Authorized Designated Student Officer.</li>
          <li>Upload a valid I20 file.</li>
          <li>Choose Corresponding ISSM file.</li>
          <li>Input Appropriate Slate file.</li>
          <li>Select Yes or No option for Transfer File to Slate dropdown.</li>
          <li>Click on process to initiate and view result.</li>
        </ol>
      </HelperCard>
    </main>
  );
};

export default Page;
