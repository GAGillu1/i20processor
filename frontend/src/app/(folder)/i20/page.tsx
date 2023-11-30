"use client";
import {
  PostProcessingCardLg,
  PreProcessorCardLg,
} from "@/components/utils/myCards";

const Admin = () => {
  return (
    <main className="w-[95%] mx-auto ">
      <h2>I20 tools</h2>
      <section className="grid gap-3 ">
        <PreProcessorCardLg />
        <PostProcessingCardLg />
      </section>
    </main>
  );
};

export default Admin;
