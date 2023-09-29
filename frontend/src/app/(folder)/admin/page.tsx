"use client";
import { useMyContext } from "@/components/utils/myContext";
import {
  InstanceCardLg,
  InstitutionCardLg,
  UsersCardLg,
} from "@/components/utils/myCards";

const Admin = () => {
  const userData = useMyContext();
  const isAdmin = userData.role === "ADMIN";
  return (
    <main className="w-[95%] mx-auto ">
      <h2 className="">Admin tools</h2>
      <section className="grid gap-3 ">
        <InstanceCardLg />
        <UsersCardLg />
        {isAdmin && <InstitutionCardLg />}
      </section>
    </main>
  );
};

export default Admin;
