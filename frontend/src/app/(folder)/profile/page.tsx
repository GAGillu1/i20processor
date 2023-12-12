"use client";

import ChangePwd from "@/app/(folder)/profile/changePwd";
import { useMyContext } from "@/components/utils/myContext";
import MyInfo from "./myInfo";
import { motion } from "framer-motion";

const Profile = () => {
  const useData = useMyContext();
  const usr = useData.email;
  return (
    <motion.main
      className="w-[95%] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Account Settings</h2>
      <section className="grid grid-cols-2 gap-2">
        <MyInfo username={usr} />
        <ChangePwd />
      </section>
    </motion.main>
  );
};

export default Profile;
