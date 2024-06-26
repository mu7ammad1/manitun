"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="dark:bg-stone-950 *:border-none p-4 max-sm:hidden">
      <div className="grid gap-y-2 *:border-none *:shadow-none">
        <Button asChild variant={pathname === "/ana" ? "default" : "outline"}>
          <Link href="/ana">مقالاتي</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">اعدادات</Link>
        </Button>
      </div>
    </nav>
  );
};
