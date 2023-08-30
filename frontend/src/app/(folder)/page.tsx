"use client";

import { AdminCard, DsoCard, I20Card } from "@/components/utils/myCards";

const Home = () => {
  return (
    <main className="w-[95%] mx-auto">
      <h2 className="">The power tools</h2>
      <section className="w-[80%] mx-auto flex justify-around my-6">
        <I20Card />
        <AdminCard />
        <DsoCard />
      </section>
    </main>
  );
};

export default Home;
