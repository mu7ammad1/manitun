import { cn } from "@/lib/utils";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { UserButton } from "../auth/user-button";
import Image from "next/image";
import icon from "@/public/safari-pinned-tab.svg";
import { A_hide } from "./A_hide";

export default async function Navbar() {
  const session = await auth();
  return (
    <section className="flex justify-between items-center w-full py-2 px-8 dark:text-white sticky top-0 z-[9000] bg-white/30 backdrop-blur-md">
      <div className="border-0 shadow-none flex items-center max-w-7xl">
        <Link href={`/`} className="flex items-center gap-3">
          <Image src={icon} alt="manitun_icon" className="w-8 h-8" />
          <h1
            className={cn(
              "text-3xl font-medium text-gray-800 dark:text-white max-sm:hidden "
            )}
          >
            manitun
          </h1>
        </Link>
      </div>
      <div>
        {!session ? (
          <LoginButton mode="modal" asChild>
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full shadow-none bg-emerald-500 text-white hover:bg-stone-700"
            >
              تسجيل دخول
            </Button>
          </LoginButton>
        ) : (
          <div className="flex justify-center items-center gap-3">
            <A_hide />
            <UserButton />
          </div>
        )}
      </div>
    </section>
  );
}
