"use client";
import { useMyContext } from "@/components/utils/myContext";
import {
  InstanceCardLg,
  InstitutionCardLg,
  PostProcessingCardLg,
  PreProcessorCardLg,
  UsersCardLg,
} from "@/components/utils/myCards";

const Help = () => {
  const userData = useMyContext();
  const isSuperUser = userData.role === "SuperUser";
  const isAdmin =
    userData.role === "Admin" || userData === "PrimaryContact" || isSuperUser;

  return (
    <main className="w-[95%] mx-auto ">
      <h2 className="">Select your help</h2>
      <section className="grid gap-3 pb-4">
        <PreProcessorCardLg />
        <PostProcessingCardLg />
        {isAdmin && <InstanceCardLg />}
        {isAdmin && <UsersCardLg />}
        {isSuperUser && <InstitutionCardLg />}
      </section>
    </main>
  );
};

export default Help;
