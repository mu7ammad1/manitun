import { cn } from "@/lib/utils";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { UserButton } from "../auth/user-button";
import { ModeToggle } from "../mode-toggle/mode_toggle";
import Image from "next/image";
import icon from "@/public/safari-pinned-tab.svg";

export default async function Navbar() {
  const session = await auth();
  return (
    <section className="flex justify-between items-center w-full py-2 px-8 dark:text-white">
      <div className="border-0 shadow-none flex items-center">
        <Link href={`/`}>
          <h1
            className={cn(
              "text-3xl font-medium text-gray-800 dark:text-white flex items-center gap-3"
            )}
          >
            <Image src={icon} alt="manitun_icon" className="w-8 h-8" />
            manitun
          </h1>
        </Link>
      </div>
      <div>
        {!session ? (
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg" className="rounded-full">
              Sign in
            </Button>
          </LoginButton>
        ) : (
          <div className="flex justify-center items-center gap-5">
            <Link
              href={`/create`}
              className="hover:text-emerald-600 flex justify-center items-center gap-2 border px-5 py-1 rounded-lg"
            >
              Create
            </Link>
            <UserButton />
          </div>
        )}
      </div>
    </section>
  );
}
