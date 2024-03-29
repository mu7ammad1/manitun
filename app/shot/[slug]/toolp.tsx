import { Button } from "@/components/ui/button";
import React from "react";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import SheetComments from "./SheetComments";

export default function Toolp() {
  return (
    <div>
      const Toople = (
      <div className="fixed bottom-5 left-1/2 right-1/2 flex justify-center">
        <div className="flex justify-end items-center bg-white/40 backdrop-blur-md px-2 gap-x-4 py-1 rounded-full">
          <Button
            variant={"default"}
            className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
          >
            <FaHeart />
          </Button>
          <Button
            variant={"default"}
            className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
          >
            <CiBookmarkPlus />
          </Button>
          <Button
            variant={"default"}
            className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-700 text-xl px-2 rounded-full"
          >
            <SheetComments />
          </Button>
        </div>
      </div>
      );
    </div>
  );
}
