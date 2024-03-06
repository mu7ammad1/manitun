import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaTerminal } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main>
      <section className="flex space-x-1 mx-10 *:bg-base">
        <p>sfa</p>
        <p>sfa</p>
        <p>sfa</p>
        <p>sfa</p>
      </section>
      <section className="w-[50%] max-md:w-[100%] p-5">
        <Card className="m-0">
          <CardHeader className="m-2 p-0">
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="text-gray-700">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-7 h-7 rounded-full" src={"https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=640&q=75"} alt="" />
            <p className="font-medium ml-3 text-sm ag-set-filter-item-checkbox">Mario Sanchez</p>
            </CardFooter>
        </Card>
      </section>
    </main>
  );
}
