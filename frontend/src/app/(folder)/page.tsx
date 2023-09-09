"use client";

import {
  AddInstanceCard,
  AddUserCard,
  InstanceCard,
  LogsCard,
  PostProcessingCard,
  PreProcessingCard,
  UsersCard,
} from "@/components/utils/myCards";

const Home = () => {
  return (
    <main className="w-[95%] mx-auto">
      <h2>The power tools</h2>
      <section className="w-[80%] mx-auto flex justify-around my-6 flex-wrap gap-4">
        <PreProcessingCard />
        <PostProcessingCard />
        <UsersCard />
        <InstanceCard />
      </section>
      <div className="my-4" />
      <h2>Quick Links</h2>
      <section className="w-[80%] mx-auto flex justify-around my-6 flex-wrap gap-4">
        <LogsCard />
        <AddUserCard />
        <AddInstanceCard />
      </section>
    </main>
  );
};

export default Home;
