import Link from "next/link";
import { useMyContext } from "./myContext";
import { ProfileIcon } from "@/assets/myIcons";
import { getGreeting } from "./utils/getTokens";

const Header = () => {
  const userData = useMyContext();
  const greeting = getGreeting();
  return (
    <section className="w-[95%] mx-auto flex justify-between items-center py-12">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          {greeting}, {userData.fullname}
        </h1>
        <p className="font-semibold text-lg text-slate-600">
          Welcome to {userData.institutionname} I-20 Processor..
        </p>
      </div>
      <Link
        className="bg-white rounded-lg tracking-wider py-2 px-4 font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition duration-150 flex items-center gap-2"
        href={"/profile"}
      >
        <ProfileIcon />
        Profile
      </Link>
    </section>
  );
};

export default Header;
