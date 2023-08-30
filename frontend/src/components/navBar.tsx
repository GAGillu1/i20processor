"use client";
import { DsoIcon } from "@/assets/myIcons";
import { HomeIcon } from "@/assets/myIcons";
import { I20Icon } from "@/assets/myIcons";
import { LogoutIcon } from "@/assets/myIcons";
import { SupportIcon } from "@/assets/myIcons";
import { UsersIcon } from "@/assets/myIcons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMyContext, useContextDispatch } from "./myContext";
import { toast } from "react-hot-toast";

const NavBar = () => {
  const path = usePathname();
  const dispatch = useContextDispatch();
  const userData = useMyContext();
  const router = useRouter();

  async function logoutUser() {
    await fetch("/api/logout");
    toast.success("Logout Successful!");
    router.push("/login");
  }

  return (
    <nav className="p-12 flex flex-col h-screen items-center font-semibold text-gray-600 justify-between tracking-wider top-0">
      <div className=" py-10">
        <Link href={"/"} className="font-extrabold text-3xl text-indigo-700 ">
          I20 Processor
        </Link>
      </div>
      <div className="flex gap-4 justify-between flex-col">
        <Link
          href={"/"}
          className={`navLink ${path === "/" ? "activeNavLink" : ""}`}
        >
          <HomeIcon />
          Home
        </Link>
        <Link
          className={`navLink ${path === "/i20" ? "activeNavLink" : ""}`}
          href={"/i20"}
        >
          <I20Icon />
          I20
        </Link>
        {userData.role === "ADMIN" && (
          <Link
            className={`navLink ${path === "/users" ? "activeNavLink" : ""}`}
            href={"/admin"}
          >
            <UsersIcon />
            Admin
          </Link>
        )}
        <Link
          className={`navLink ${path === "/dso" ? "activeNavLink" : ""}`}
          href={"/dso"}
        >
          <DsoIcon /> DSO
        </Link>
      </div>
      <div>
        <Link href={"/support"} className="navLink">
          <SupportIcon /> Support
        </Link>
        <button className="navLink" onClick={() => logoutUser()}>
          <LogoutIcon />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
