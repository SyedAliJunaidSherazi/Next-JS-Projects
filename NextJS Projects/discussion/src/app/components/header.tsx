// app/components/header.tsx
"use client";

import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  // Use the useSession hook to get the current session data on the client side
  const { data: session, status } = useSession();

  let authContent: React.ReactNode;
  // while session is loading, we will not display anything
  if (status === "loading") {
    authContent = null;
  } else if (session?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.user.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <Button type="submit" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <Button
            type="submit"
            onClick={() => signIn("github")}
            color="secondary"
            variant="bordered"
          >
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            type="submit"
            onClick={() => signIn("github")}
            color="primary"
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </>
    );
  }

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">{authContent}</NavbarContent>
    </Navbar>
  );
}
