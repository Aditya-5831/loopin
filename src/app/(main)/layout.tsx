import { validateRequest } from "@/auth";
import SessionProvider from "@/providers/SessionProvider";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import MenuBar from "@/components/MenuBar";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const session = await validateRequest();

  if (!session.user) {
    return redirect("/sign-in");
  }

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <MenuBar className="bg-card sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
          {children}
        </div>
        <MenuBar className="bg-card sticky bottom-0 flex w-full justify-center gap-5 border-t p-3 sm:hidden" />
      </div>
    </SessionProvider>
  );
};

export default MainLayout;
