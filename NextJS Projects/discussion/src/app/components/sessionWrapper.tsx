'use client';

import { SessionProvider } from "next-auth/react";

interface ProviderProps{
    children: React.ReactNode,
}

const SessionWrapper = ({children}: ProviderProps) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionWrapper;