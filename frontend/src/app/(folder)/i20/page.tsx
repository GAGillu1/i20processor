"use client";
import {
  PostProcessingCardLg,
  PreProcessorCardLg,
} from "@/components/utils/myCards";
import { AnimationVariants } from "@/components/utils/variants";
import { motion } from "framer-motion";

const Admin = () => {
  return (
    <main className="w-[95%] mx-auto ">
      <h2>I20 tools</h2>
      <motion.section
        className="grid gap-3 "
        initial="initial"
        animate="animate"
        variants={AnimationVariants.container}
      >
        <PreProcessorCardLg />
        <PostProcessingCardLg />
      </motion.section>
    </main>
  );
};

export default Admin;
