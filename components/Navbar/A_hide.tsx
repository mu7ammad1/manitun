"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";

const CreateBTN = () => {
  const pathname = usePathname();

  return (
    <div className="">
      {pathname !== "/create" ? (
        <Button
          variant={"outline"}
          className="shadow-none border-none flex justify-center items-center gap-3 rounded-full "
        >
          <p className="text-xl">
            <CiEdit />
          </p>
          <Link href={`/create`} target="_blank" className="max-sm:hidden">
            Create
          </Link>
        </Button>
      ) : null}
    </div>
  );
};

export default CreateBTN;
