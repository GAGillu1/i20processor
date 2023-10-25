"use client";

import ChangePwd from "@/app/(folder)/profile/changePwd";
import { useMyContext } from "@/components/utils/myContext";
import MyInfo from "./myInfo";

const Profile = () => {
  const useData = useMyContext();
  const usr = useData.email;
  return (
    <main className="w-[95%] mx-auto">
      <h2>Account Settings</h2>
      <section className="grid grid-cols-2 gap-2">
        <MyInfo username={usr} />
        <ChangePwd />
      </section>
    </main>
  );
};

export default Profile;
