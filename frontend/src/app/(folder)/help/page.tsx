"use client";
import { useMyContext } from "@/components/utils/myContext";
import {
  InstanceCardLg,
  InstitutionCardLg,
  PostProcessingCardLg,
  PreProcessorCardLg,
  UsersCardLg,
} from "@/components/utils/myCards";
import { motion } from "framer-motion";
import { AnimationVariants } from "@/components/utils/variants";

const Help = () => {
  const userData = useMyContext();
  const isSuperUser = userData.role === "SuperUser";
  const isAdmin =
    userData.role === "Admin" || userData === "PrimaryContact" || isSuperUser;

  return (
    <main className="w-[95%] mx-auto ">
      <h2>Select your help</h2>
      <motion.section
        className="grid gap-3 pb-4"
        initial="initial"
        animate="animate"
        variants={AnimationVariants.container}
      >
        <PreProcessorCardLg />
        <PostProcessingCardLg />
        {isAdmin && <InstanceCardLg />}
        {isAdmin && <UsersCardLg />}
        {isSuperUser && <InstitutionCardLg />}
      </motion.section>
    </main>
  );
};

export default Help;
