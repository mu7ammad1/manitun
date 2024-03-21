"use client";

import { signIn } from "next-auth/react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full rounded-full gap-3"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FaGoogle className="h-5 w-5" />
        <span>Google</span>
      </Button>
      <Button
        size="lg"
        className="w-full rounded-full gap-3"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaFacebookF className="h-5 w-5" />
        <span>Google</span>
      </Button>
    </div>
  );
};
