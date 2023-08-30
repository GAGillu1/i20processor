import { DsoIcon, I20Icon, InstanceIcon, UsersIcon } from "@/assets/myIcons";
import Link from "next/link";

export const I20Card = () => {
  return (
    <Link href={"/i20"}>
      <div className="bg-white rounded-lg w-40 h-40 shadow-inner">
        <div className="bg-indigo-50 rounded-t-lg h-28 w-full items-center flex">
          <I20Icon className="w-16 h-16 text-indigo-900 mx-auto" />
        </div>
        <div className="flex items-center justify-center h-12">
          <h3 className="font-semibold text-lg ">I20</h3>
        </div>
      </div>
    </Link>
  );
};

export const AdminCard = () => {
  return (
    <Link href={"/admin"}>
      <div className="bg-white rounded-lg w-40 h-40">
        <div className="bg-indigo-50 rounded-t-lg h-28 w-full items-center flex">
          <UsersIcon className="w-16 h-16 text-indigo-900 mx-auto" />
        </div>
        <div className="flex items-center justify-center h-12">
          <h3 className="font-semibold text-lg ">Admin</h3>
        </div>
      </div>
    </Link>
  );
};

export const DsoCard = () => {
  return (
    <Link href={"/dso"}>
      <div className="bg-white rounded-lg w-40 h-40">
        <div className="bg-indigo-50 rounded-t-lg h-28 w-full items-center flex">
          <DsoIcon className="w-16 h-16 text-indigo-900 mx-auto" />
        </div>
        <div className="flex items-center justify-center h-12">
          <h3 className="font-semibold text-lg ">DSO</h3>
        </div>
      </div>
    </Link>
  );
};

export const InstanceCardLg = () => {
  return (
    <Link href={"/admin/instance"}>
      <section className="grid grid-cols-6 rounded-lg ">
        <div className="bg-indigo-50 rounded-l-lg flex items-center justify-center">
          <InstanceIcon className="w-16 h-16 text-indigo-900 mx-auto" />
        </div>
        <div className="col-span-5 bg-white rounded-r-lg p-2">
          <h3 className="text-indigo-900">Instance </h3>
          <p className="pt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
            natus asperiores nostrum perspiciatis voluptate nam similique
            debitis ut vel, cupiditate eaque ex beatae et quia minima ipsam ea
            sapiente sequi.
          </p>
        </div>
      </section>
    </Link>
  );
};

export const UsersCardLg = () => {
  return (
    <Link href={"/admin/users"}>
      <section className="grid grid-cols-6 rounded-lg ">
        <div className="bg-indigo-50 rounded-l-lg flex items-center justify-center">
          <UsersIcon className="w-16 h-16 text-indigo-900 mx-auto" />
        </div>
        <div className="col-span-5 bg-white rounded-r-lg p-2">
          <h3 className="text-indigo-900">Users </h3>
          <p className="pt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
            natus asperiores nostrum perspiciatis voluptate nam similique
            debitis ut vel, cupiditate eaque ex beatae et quia minima ipsam ea
            sapiente sequi.
          </p>
        </div>
      </section>
    </Link>
  );
};
