"use client";
import { useMyContext } from "@/components/utils/myContext";
import {
  InstanceCardLg,
  InstitutionCardLg,
  UsersCardLg,
} from "@/components/utils/myCards";

const Admin = () => {
  const userData = useMyContext();
  const isSuperUser = userData.role === "SuperUser";

  return (
    <main className="w-[95%] mx-auto ">
      <h2 className="">Admin tools</h2>
      <section className="grid gap-3 ">
        <InstanceCardLg />
        <UsersCardLg />
        {isSuperUser && <InstitutionCardLg />}
      </section>
    </main>
  );
};

export default Admin;
