"use client";

import { useMyContext } from "@/components/utils/myContext";
import {
  AddInstanceCard,
  AddUserCard,
  ChangePasswordCard,
  InstanceCard,
  LogsCard,
  PostProcessingCard,
  PreProcessingCard,
  InstitutionCard,
  UsersCard,
} from "@/components/utils/myCards";
import { motion } from "framer-motion";
import { AnimationVariants } from "@/components/utils/variants";

const Home = () => {
  const userData = useMyContext();
  const isAdmin =
    userData.role === "PrimaryContact" ||
    userData.role === "SuperUser" ||
    userData.role === "Admin";
  const isSuperUser = userData.role === "SuperUser";

  return (
    <motion.main
      className="w-[95%] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>The power tools</h2>
      <motion.section
        className="w-[80%] mx-auto flex justify-around my-6 flex-wrap gap-4"
        initial="initial"
        animate="animate"
        variants={AnimationVariants.container}
      >
        <PreProcessingCard />
        <PostProcessingCard />
        {isAdmin && <UsersCard />}
        {isAdmin && <InstanceCard />}
        {isSuperUser && <InstitutionCard />}
      </motion.section>
      <div className="my-4" />
      <h2>Quick Links</h2>
      <motion.section
        className="w-[80%] mx-auto flex justify-around my-6 flex-wrap gap-4 text-center leading-tight"
        initial="initial"
        animate="animate"
        variants={AnimationVariants.container}
      >
        <LogsCard />
        {isAdmin && <AddUserCard />}
        {isAdmin && <AddInstanceCard />}
        <ChangePasswordCard />
      </motion.section>
    </motion.main>
  );
};

export default Home;
