"use client";
import { AdminIcon, DsoIcon, LogsIcon } from "@/assets/myIcons";
import { HomeIcon } from "@/assets/myIcons";
import { I20Icon } from "@/assets/myIcons";
import { LogoutIcon } from "@/assets/myIcons";
import { SupportIcon } from "@/assets/myIcons";
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
    dispatch({ type: "logout" });
    await fetch("/api/logout");
    toast.success("Logout Successful!");
    router.push("/login");
  }

  return (
    <nav className="py-12 px-10 flex flex-col h-screen items-center font-semibold text-gray-600 justify-between tracking-wider top-0">
      <div className="pt-3">
        <Link href={"/"} className="font-extrabold text-3xl text-indigo-700 ">
          I-20 Processor
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
          className={`navLink ${path.includes("/i20") ? "activeNavLink" : ""}`}
          href={"/i20"}
        >
          <I20Icon />
          I20
        </Link>
        {userData.role === "ADMIN" && (
          <Link
            className={`navLink ${
              path.includes("/admin") ? "activeNavLink" : ""
            }`}
            href={"/admin"}
          >
            <AdminIcon />
            Admin
          </Link>
        )}
        {userData.role !== "USER" && (
          <Link
            className={`navLink ${path === "/dso" ? "activeNavLink" : ""}`}
            href={"/dso"}
          >
            <DsoIcon /> DSO
          </Link>
        )}
        <Link
          href={"/logs"}
          className={`navLink ${path === "/logs" ? "activeNavLink" : ""}`}
        >
          <LogsIcon />
          Logs
        </Link>
      </div>
      <div>
        <Link href={"/support"} className="navLink text-slate-500 font-normal">
          <SupportIcon /> Support
        </Link>
        <button
          className="font-normal text-slate-500 bg-indigo-50"
          onClick={() => logoutUser()}
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
