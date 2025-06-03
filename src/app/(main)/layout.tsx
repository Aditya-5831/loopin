import { validateRequest } from "@/auth";
import SessionProvider from "@/providers/SessionProvider";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const session = await validateRequest();

  if (!session.user) {
    return redirect("/sign-in");
  }

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto max-w-7xl p-5">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default MainLayout;
