"use client";

import { useMyContext } from "@/components/myContext";
import {
  AddInstanceCard,
  AddUserCard,
  ChangePasswordCard,
  InstanceCard,
  LogsCard,
  PostProcessingCard,
  PreProcessingCard,
  UsersCard,
} from "@/components/utils/myCards";

const Home = () => {
  const userData = useMyContext();
  const isAdmin = userData.role === "ADMIN";

  return (
    <main className="w-[95%] mx-auto ">
      <h2>The power tools</h2>
      <section className="w-[80%] mx-auto flex justify-around my-6 flex-wrap gap-4">
        <PreProcessingCard />
        <PostProcessingCard />
        {isAdmin && <UsersCard />}
        {isAdmin && <InstanceCard />}
      </section>
      <div className="my-4" />
      <h2>Quick Links</h2>
      <section className="w-[80%] mx-auto flex justify-around my-6 flex-wrap gap-4 text-center leading-tight">
        <LogsCard />
        {isAdmin && <AddUserCard />}
        {isAdmin && <AddInstanceCard />}
        <ChangePasswordCard />
      </section>
    </main>
  );
};

export default Home;
