import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/auth";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Input } from "../ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const ModeToggle = dynamic(
  () => import("@/components/mode-toggle/mode_toggle"),
  { ssr: false }
);
const CreateBTN = dynamic(() => import("./A_hide"), { ssr: false });
const LoginButton = dynamic(() => import("@/components/auth/login-button"), {
  ssr: true,
});

const UserButton = dynamic(() => import("@/components/auth/user-button"), {
  ssr: true,
});

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center w-full py-2 px-8 sticky top-0 z-20 bg-white dark:bg-stone-950">
      <div className="border-0 shadow-none flex items-center max-w-7xl gap-3">
        <Link href={`/`} className="text-3xl font-semibold">
          <p>Manitun</p>
        </Link>
        <Suspense fallback={`DialogSearch Loading...`}>
          <div className="bg-secondary max-sm:bg-white/0 rounded-full flex items-center px-2 gap-0 focus-visible:ring-1">
            <MagnifyingGlassIcon className="scale-150" />
            <div className="max-sm:hidden">
              <Input
                type="search"
                className="border-none shadow-none bg-secondary rounded-full w-full max-sm:bg-black focus-visible:ring-0"
                placeholder="Searching..."
              />
            </div>
          </div>
        </Suspense>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Suspense fallback={`ModeToggle Loading...`}>
          <ModeToggle />
        </Suspense>
        {!session ? (
          <Suspense fallback={`LoginButton Loading...`}>
            <LoginButton mode="modal" asChild>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full shadow-none"
              >
                تسجيل دخول
              </Button>
            </LoginButton>
          </Suspense>
        ) : (
          <div className="flex justify-center items-center gap-3">
            <CreateBTN />
            <Suspense fallback={`UserButton Loading...`}>
              <UserButton />
            </Suspense>
          </div>
        )}
      </div>
    </nav>
  );
}
