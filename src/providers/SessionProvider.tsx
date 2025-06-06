"use client";

import { Session, User } from "lucia";
import React, { createContext, PropsWithChildren, useContext } from "react";

interface SessionContextProps {
  user: User;
  session: Session;
}

const SessionContext = createContext<SessionContextProps | null>(null);

export default function SessionProvider({
  children,
  value,
}: PropsWithChildren<{
  value: SessionContextProps;
}>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
