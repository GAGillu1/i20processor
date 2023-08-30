import { InstanceCardLg, UsersCardLg } from "@/components/utils/myCards";

const Admin = () => {
  return (
    <main className="w-[95%] mx-auto ">
      <h2 className="">Admin tools</h2>
      <section className="grid gap-3 ">
        <InstanceCardLg />
        <UsersCardLg />
      </section>
    </main>
  );
};

export default Admin;
