"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { FcSettings } from "react-icons/fc";
import { PiUser } from "react-icons/pi";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-0">
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 gap-5" align="end">
        <Link href={`/${user?.username}`}>
          <DropdownMenuItem className="hover:cursor-pointer ">
            <PiUser className="h-4 w-4 mr-2" />
            ملف الشخصي
          </DropdownMenuItem>
        </Link>
        <Link href={`/ana`}>
          <DropdownMenuItem className="hover:cursor-pointer ">
            <FcSettings className="h-4 w-4 mr-2" />
            مقالاتي
          </DropdownMenuItem>
        </Link>
        <Link href={`/settings`}>
          <DropdownMenuItem className="hover:cursor-pointer ">
            <FcSettings className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem className="text-rose-500 hover:cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
