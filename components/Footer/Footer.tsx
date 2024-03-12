import Image from "next/image";
import Feed from "@/public/assets/menu.svg";
import Twitter from "@/public/assets/menu.svg";
import Facebook from "@/public/assets/menu.svg";
import Logo from "@/public/assets/menu.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-between items-center px-5 static bottom-0">
      <div className="space-x-4">
        <Link href={`/contact`}>
          <span className="hover:underline underline-offset-8 decoration-2 decoration-wavy decoration-emerald-500">
            contact
          </span>
        </Link>
        <Link href={`/contact`}>
          <span className="hover:underline underline-offset-8 decoration-2 decoration-wavy decoration-emerald-500">
            contact
          </span>
        </Link>
        <Link href={`/contact`}>
          <span className="hover:underline underline-offset-8 decoration-2 decoration-wavy decoration-emerald-500">
            contact
          </span>
        </Link>
        <Link href={`/contact`}>
          <span className="hover:underline underline-offset-8 decoration-2 decoration-wavy decoration-emerald-500">
            contact
          </span>
        </Link>
      </div>
      <p className="font-normal py-5 text-[#5F7896] text-center">
        Manitun 2024
      </p>
    </div>
  );
}
