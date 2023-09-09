"use client";

import ChangePwd from "@/components/changePwd";
import { useMyContext } from "@/components/myContext";
import MyInfo from "@/components/myInfo";

const Profile = ({ params }: { params: { username: string } }) => {
  const usr = params.username;
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
