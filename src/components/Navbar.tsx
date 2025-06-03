"use client";

import Link from "next/link";
import React from "react";

import SearchField from "./SearchField";
import UserButton from "./UserButton";

const Navbar = () => {
  return (
    <header className="bg-card sticky top-0 z-10 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="/" className="text-primary text-2xl font-bold">
          Loopin
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
};

export default Navbar;
