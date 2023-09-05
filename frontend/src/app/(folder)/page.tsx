"use client";

import {
  AdminCard,
  DsoCard,
  I20Card,
  InstanceCard,
  PostProcessingCard,
  PreProcessingCard,
  UsersCard,
} from "@/components/utils/myCards";

const Home = () => {
  return (
    <main className="w-[95%] mx-auto">
      <h2>The power tools</h2>
      <section className="w-[80%] mx-auto flex justify-around my-6 flex-wrap gap-4">
        <I20Card />
        <PreProcessingCard />
        <PostProcessingCard />
        <AdminCard />
        <DsoCard />
        <UsersCard />
        <InstanceCard />
      </section>
    </main>
  );
};

export default Home;
