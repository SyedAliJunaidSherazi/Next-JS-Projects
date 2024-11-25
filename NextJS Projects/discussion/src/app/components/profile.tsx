'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function Profile() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <>
        Signed in as {JSON.stringify(session.user)} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      {/* <Button onClick={() => signIn()}>Sign in</Button> */}
      <Button onClick={() => signIn('github')}>Sign in</Button>   
      {/* SignIn using Github directly */}
    </>
  );
}