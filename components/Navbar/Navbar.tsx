import { cn } from "@/lib/utils";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";
import { Lilita_One } from "next/font/google";
import Link from "next/link";
import { auth } from "@/auth";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutButton } from "../auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "../mode-toggle/mode_toggle";

const font = Lilita_One({
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
      <div>
        {!session ? (
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg" className="rounded-full">
              Sign in
            </Button>
          </LoginButton>
        ) : (
          <div>
            <ModeToggle />
            <Link href={`/create`} className="mx-5 font-medium">
              <Button variant="secondary" size="lg">
                Create
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger className="font-medium">Account</PopoverTrigger>
              <PopoverContent className="space-y-1 *:shadow-none p-1 mr-7 w-60 mt-3">
                <Button variant="outline" size="lg" className="border-0 w-full">
                  <Link href={`/settings`}>Settings</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-0 w-full">
                  <Link href={`/settings`}>Settings</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-0 w-full">
                  <Link href={`/settings`}>Settings</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-0 w-full">
                  <Link href={`/settings`}>Settings</Link>
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  className="border-0 w-full"
                >
                  <LogoutButton>Logout</LogoutButton>
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </section>
  );
}
