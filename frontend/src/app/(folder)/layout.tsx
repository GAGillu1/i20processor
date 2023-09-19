"use client";
import NavBar from "@/components/navBar";
import Header from "@/components/header";
import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="grid grid-cols-6">
        <NavBar />
        <section className="col-span-5 bg-indigo-200 rounded-l-3xl my-3">
          <Header />
          {children}
        </section>
      </div>
    </React.Fragment>
  );
}
