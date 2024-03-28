"use client";
/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PiFileImageThin } from "react-icons/pi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export function Elements_one({
  Link_title,
  title,
  tag1,
  tag2,
  description,
  username,
  picture,
  image,
}: any) {
  return (
    <div className="py-2 px-2 my-5 group ease-out duration-300 *:text-right">
      <div>
        <img
          src={image}
          alt={"mantun.com - " + username}
          className="w-full h-[164px] max-sm:h-80 max-md:h-80 p-2 object-cover object-center rounded-xl group-hover:scale-105 scale-100 group-hover:ease-in duration-300"
        />
      </div>
      <div className="pt-2 pb-4 grid gap-2">
        <p className="text-xs">2024 / 24/ 9</p>
        <h1
          className={cn(
            "text-xl font-medium hover:underline hover:underline-offset-8 decoration-emerald-600"
          )}
        >
          <Link href={`/story/${Link_title}`}>{title}</Link>
        </h1>
        <p
          className={cn(
            "text-xs font-extralight italic  text-right pl-2 -indent-8"
          )}
        >
          {description}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <span className="bg-[#D9D9D940] py-1 px-3 rounded-full text-xs">
            <Link href={"/tag/" + tag1}>{tag1}</Link>
          </span>
          <span className="bg-[#D9D9D940] py-1 px-3 rounded-full text-xs">
            <Link href={"/tag/" + tag2}>{tag2}</Link>
          </span>
        </div>
        <div className="flex justify-center items-center gap-3">
          <Link href={username}>
            <span className="text-xs">{username}</span>
          </Link>
          <Link href={username}>
            <img
              src={picture}
              alt={"manitun.com - " + username}
              className="w-5 h-5 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Elements_two({
  Link_title,
  title,
  tag1,
  tag2,
  description,
  username,
  picture,
  image,
  createdAt,
}: any) {
  return (
    <div className="w-screen max-lg: max-w-[990px]  flex *:text-right p-2 group max-sm:block">
      <div className="basis-1/2">
        {image ? (
          <div className="flex justify-center">
            <img
              src={image}
              alt={`mantun.com - ` + username}
              className="w-full p-2 h-[164px] max-sm:h-full max-md:h-full object-cover object-center rounded-xl group-hover:scale-105 scale-100 group-hover:ease-in duration-300"
            />
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
      <div className="basis-full px-5">
        <h1
          className={cn(
            "text-xl font-medium hover:underline hover:underline-offset-8 decoration-emerald-600 mb-3"
          )}
        >
          <Link href={`/story/${Link_title}`}>{title}</Link>
        </h1>
        <p
          className={cn(
            "text-xs font-light italic  text-right -indent-8 pl-5 mb-3"
          )}
        >
          {description}
        </p>
        <div className="flex justify-end items-center gap-5">
          <div className="flex justify-center items-center gap-2">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: enUS,
            })}

            <span className="bg-[#D9D9D940] py-1 px-3 rounded-full text-xs">
              <Link href={"/tag/" + tag1}>{tag1}</Link>
            </span>
            <span className="bg-[#D9D9D940] py-1 px-3 rounded-full text-xs">
              <Link href={"/tag/" + tag2}>{tag2}</Link>
            </span>
          </div>
          <div className="flex justify-center items-center gap-3 rounded-full">
            <Link href={username}>
              <span className="text-xs">{username}</span>
            </Link>
            <Link href={username}>
              <img
                src={picture}
                alt={"manitun.com - " + username}
                className="w-5 h-5 rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Elements_three() {
  const pathname = usePathname();
  return (
    <div className="dark:bg-neutral-800 my-5">
      <Carousel>
        <CarouselContent className="px-10 gap-3">
          {pathname === "/explore" ? (
            <CarouselItem className="basis-auto -ml-0 pl-0 ">
              <Link href={``}>
                <Button
                  variant={"outline"}
                  className="border-0 gap-2 bg-stone-200 hover:bg-stone-200 px-5 text-lg rounded-full"
                >
                  🌙 Ramadan
                </Button>
              </Link>
            </CarouselItem>
          ) : null}
        </CarouselContent>
      </Carousel>

      <h1 className="text-4xl text-center font-semibold my-12">
        استكشف الموضوعات
      </h1>
      <div className="flex justify-center items-center my-10 max-sm:w-full">
        <div className="bg-stone-100 flex justify-center items-center rounded-full max-w-lg w-full max-sm:max-w-xs gap-1 px-2">
          <div className="text-2xl text-center">
            <CiSearch />
          </div>
          <Input
            type="search"
            name="search"
            id="search"
            placeholder="Searching"
            className="py-6 px-2 text-lg rounded-full border-0 shadow-none focus-visible:ring-0 focus-visible:ring-stone-50 placeholder:text-stone-700"
          />
        </div>
      </div>
    </div>
  );
}
