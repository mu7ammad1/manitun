import Image from "next/image";
import Feed from "@/public/assets/menu.svg";
import Twitter from "@/public/assets/menu.svg";
import Facebook from "@/public/assets/menu.svg";
import Logo from "@/public/assets/menu.svg";

export default function Footer() {
  return (
    <div className="px-7 py-5 flex justify-between items-center">
      <ul className="flex flex-col items-center gap-y-[32px] pt-[56px] text-[#36485C] sm:flex-row sm:justify-center sm:gap-x-5 sm:pt-5">
        <li>Features</li>
        <li>Pricing</li>
        <li>Enterprise</li>
        <li>Careers</li>
      </ul>

      <p className="pt-[56px] text-center text-[14px] font-medium text-[#5F7896] sm:pt-5">
        © Copyright 2024. Manitun. All rights reserved.
      </p>
    </div>
  );
}
