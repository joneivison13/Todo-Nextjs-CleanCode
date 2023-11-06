"use client";
import React, { createContext } from "react";
import { SessionProvider } from "next-auth/react";

export const Context = createContext({});

const AppProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <Context.Provider value={{}}>{children}</Context.Provider>
    </SessionProvider>
  );
};

export default AppProvider;
