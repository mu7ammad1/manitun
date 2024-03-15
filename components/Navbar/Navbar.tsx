import { cn } from "@/lib/utils";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";
import { Lilita_One, Acme } from "next/font/google";
import Link from "next/link";
import { auth } from "@/auth";
import { UserButton } from "../auth/user-button";

const font = Lilita_One({
  subsets: ["latin"],
  weight: ["400"],
});
const searchFont = Acme({
  subsets: ["latin"],
  weight: ["400"],
});
export default async function Navbar() {
  const session = await auth();
  return (
    <section className="flex justify-between items-center w-full py-2 px-8 dark:text-white">
      <div className="border-0 shadow-none flex items-center">
        <Link href={`/`}>
          <h1
            className={cn(
              "text-3xl font-medium text-gray-800 dark:text-white",
              font.className
            )}
          >
            Manitun
          </h1>
        </Link>
      </div>
      <div className="border-0 shadow-none flex items-center">
        <input
          type="text"
          placeholder="Search"
          className={cn(
            "text-lg font-medium text-gray-800 dark:text-white py-1 px-4 rounded-full bg-stone-100 w-96 max-md:w-52 max-sm:hidden focus-visible:outline-0",
            searchFont.className
          )}
        />
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
              className="hover:text-emerald-600 flex justify-center items-center gap-2"
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
