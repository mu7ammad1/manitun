"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";

export const CreateBTN = () => {
  const pathname = usePathname();

  return (
    <div className="">
      {pathname !== "/create" ? (
        <Button
          variant={"default"}
          className="shadow-none flex justify-center items-center gap-3 rounded-full "
        >
          <p className="text-xl">
            <CiEdit />
          </p>
          <Link href={`/create`} className="max-sm:hidden">
            Create
          </Link>
        </Button>
      ) : null}
    </div>
  );
};
