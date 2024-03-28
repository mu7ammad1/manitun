import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { UserButton } from "../auth/user-button";
import { CreateBTN } from "./A_hide";
import DialogSearch from "./DialogSearch";
import { ModeToggle } from "../mode-toggle/mode_toggle";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex justify-between items-center w-full py-2 px-8 sticky top-0 z-20 bg-white dark:bg-stone-950">
      <div className="border-0 shadow-none flex items-center max-w-7xl gap-3">
        <Link href={`/`} className="text-3xl font-medium">
          manitun
        </Link>
        <DialogSearch />
      </div>
      <div className="flex justify-center items-center gap-3">
        {!session ? (
          <LoginButton mode="modal" asChild>
            <Button
              variant="default"
              size="lg"
              className="rounded-full shadow-none"
            >
              تسجيل دخول
            </Button>
          </LoginButton>
        ) : (
          <div className="flex justify-center items-center gap-3">
            <CreateBTN />
            <UserButton />
          </div>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
