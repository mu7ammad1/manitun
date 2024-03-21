"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";

export const A_hide = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/create" || "edit" ? (
        <Button className="bg-emerald-600 shadow-none hover:bg-stone-800 flex justify-center items-center gap-3">
          <p className="text-xl">
            <CiEdit />
          </p>
          <Link href={`/create`}>Create</Link>
        </Button>
      ) : null}
    </>
  );
};
