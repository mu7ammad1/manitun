import { Button } from "@/components/ui/button";
import React from "react";

export default function Forehead({ text }: any) {
  return (
    <div className="py-10 bg-[#ffebb2]/80">
      <h1 className="text-6xl max-md:text-4xl text-center font-semibold my-12 dark:text-[#007F73]/100 uppercase">
        {text}
      </h1>
    </div>
  );
}
