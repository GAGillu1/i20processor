"use client";
import { useMyContext } from "@/components/utils/myContext";
import {
  InstanceCardLg,
  InstitutionCardLg,
  UsersCardLg,
} from "@/components/utils/myCards";
import { motion } from "framer-motion";
import { AnimationVariants } from "@/components/utils/variants";

const Admin = () => {
  const userData = useMyContext();
  const isSuperUser = userData.role === "SuperUser";

  return (
    <motion.main
      className="w-[95%] mx-auto "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="">Admin tools</h2>
      <motion.section
        className="grid gap-3 "
        initial="initial"
        animate="animate"
        variants={AnimationVariants.container}
      >
        <InstanceCardLg />
        <UsersCardLg />
        {isSuperUser && <InstitutionCardLg />}
      </motion.section>
    </motion.main>
  );
};

export default Admin;
