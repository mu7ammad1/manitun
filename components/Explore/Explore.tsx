/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const Element_1 = () => {
  return (
    <Card className="m-0 shadow-none border-none flex flex-row gap-2 hover: hover:group-[]:bg-zinc-800">
      <CardHeader className="m-2  p-0 basis-10/12">
        <CardFooter className="text-gray-700  m-0 p-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-5 h-5 rounded-full"
            src={
              "https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=640&q=75"
            }
            alt=""
          />
          <Link href={`/mu7ammad`}>
            <span className="font-medium ml-3 text-sm ag-set-filter-item-checkbox">
              Mario Sanchez
            </span>
          </Link>
        </CardFooter>
        <CardTitle>
          <Link
            href={`/mu7ammad/Neom:-Saudi-Arabia's-Futuristic-Megacity-15246134481`}
          >
            <h1 className="text-2xl font-bold hover:underline underline-offset-8 decoration-1">
              Neom: Saudi Arabia's Futuristic Megacity
            </h1>
          </Link>
        </CardTitle>
        <CardDescription className="text-sm font-normal text-neutral-800/90 max-md:hidden">
          Neom is an ambitious project envisioned by Saudi Arabia's Crown
          Prince, Mohammed bin Salman, as part of the kingdom's Vision 2030 plan
          to diversify its economy away from oil.
        </CardDescription>
        <CardDescription className="text-sm text-neutral-800/90 font-normal pt-2 flex gap-2">
          <span className="bg-neutral-100  px-5 rounded-full flex justify-center items-center">
            neutral
          </span>
        </CardDescription>
      </CardHeader>
      <CardHeader className="m-5 p-0 basis-1/6 flex items-end">
        <div className="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className=" object-cover rounded-md object-center hover:shadow-[6px_6px_0px_0px_#3DFFDC] inset-0 duration-300 hover:scale-x-105 hover:scale-y-105 "
            src={
              "https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg%3Fw%3D2000%26auto%3Dformat&w=640&q=75"
            }
            alt="asfa"
          />
        </div>
      </CardHeader>
    </Card>
  );
};

export default function Explore() {
  return (
    <Card className="*:m-0 *:p-0 shadow-none border-none space-y-2 space-x-0">
      <Element_1 />
      <Element_1 />
      <Element_1 />
      <Element_1 />
      <Element_1 />
      <Element_1 />
    </Card>
  );
}
