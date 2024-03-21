/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import Skeleton_expore from "@/components/Skeleton/Skeleton.expore";
import { cn } from "@/lib/utils";
import { Mada } from "next/font/google";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

const font = Mada({ subsets: ["arabic"], weight: "900" });
const font1 = Mada({ subsets: ["arabic"], weight: "500" });

const MyComponent_TAg = ({ params }) => {
  const [data, setData] = useState(null);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function fetchData() {
    try {
      const response = await axios.get(`https://manitun.vercel.app/api/article`, {
        headers: {
          "use-client": "true",
        },
      });
      const userData = response.data;
      const randomData = shuffleArray(
        userData.data.filter((article) => article.draft.toString() === "true")
      );
      setData(randomData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [params]);

  const pathname = usePathname();
  const decodedText = decodeURIComponent(params);
  const user = useCurrentUser();

  return (
    <div>
      <Carousel className="my-5">
        <CarouselContent className="px-10 gap-3 flex">
          {data !== null ? (
            <>
              {data
                .reduce((allTags, article) => {
                  article.tags.forEach((tag) => {
                    if (!allTags.includes(tag)) {
                      allTags.push(tag);
                    }
                  });
                  return allTags;
                }, [])
                .map((tag, index) => (
                  <CarouselItem key={index} className="basis-auto -ml-0 pl-0 ">
                    <Link href={`/tag/${tag === "" ? "explore" : tag}`}>
                      <Button
                        variant={"outline"}
                        className="border-0 gap-2 bg-stone-200 hover:bg-stone-200 px-5 text-lg rounded-full"
                      >
                        {tag === "palestine"
                          ? `🍉 ${tag}`
                          : tag === "ramadam"
                          ? `🌙 ${tag}`
                          : tag === ""
                          ? "🦉 Explore"
                          : tag}
                      </Button>
                    </Link>
                  </CarouselItem>
                ))}
            </>
          ) : (
            <span>Loading....</span>
          )}
        </CarouselContent>
      </Carousel>

      <div className=" flex justify-center items-center my-10 max-sm:w-full">
        <div className=" px-10 flex justify-center items-center max-w-lg w-full max-sm:max-w-xs gap-1">
          <div className="w-full my-16">
            <h1 className=" text-6xl text-center font-semibold capitalize my-5 mb-10">
              {decodedText}
            </h1>
            {user ? (
              <Button
                variant={"default"}
                className="bg-emerald-500 hover:bg-stone-950 w-full"
              >
                Follow
              </Button>
            ) : (
              <Button
                variant={"default"}
                className="bg-stone-950 hover:bg-stone-950 w-full"
              >
                برجاء تسجيل الدخول لمتابعة الوسم
              </Button>
            )}
          </div>
        </div>
      </div>

      {data !== null ? (
        <div className="col-span-2 h-full space-y-2">
          {data.length === 0 && <p>No articles yet</p>}
          {data.length > 0 && (
            <>
              {data.map((article, id) => (
                <div key={id} className="">
                  {article.tags.includes(decodedText) && (
                    <div className="flex justify-center items-center">
                      <div className="flex w-full justify-center items-center max-w-6xl max-lg:block ">
                        <div className="basis-[256px]  max-xl: hidden">fga</div>
                        <div className="w-full max-w-full flex *:text-right p-2 group max-sm:block">
                          <div className="basis-1/2 hover:bg-stone-100 rounded-md">
                            {article.image ? (
                              <div className="flex justify-center">
                                <img
                                  src={article.image}
                                  alt={`mantun.com - ` + article.authorId}
                                  className="w-full p-2 h-[164px] max-sm:h-full max-md:h-[164px] object-cover object-center rounded-xl group-hover:scale-105 scale-100 group-hover:ease-in duration-300"
                                />
                              </div>
                            ) : (
                              <div className="hidden"></div>
                            )}
                          </div>
                          <div className="basis-full px-5">
                            <p className="text-sm">
                              {formatDistanceToNow(
                                new Date(article.createdAt),
                                {
                                  addSuffix: true,
                                  locale: enUS,
                                }
                              )}
                            </p>
                            <h1
                              className={cn(
                                font.className,
                                "text-xl font-normal hover:underline hover:underline-offset-8 decoration-emerald-600 mb-3"
                              )}
                            >
                              <Link href={`/story/${article.id}`}>
                                {article.title}
                              </Link>
                            </h1>
                            <p
                              className={cn(
                                font1.className,
                                "text-xs font-light italic  text-right -indent-8 pl-5 mb-3"
                              )}
                            >
                              {article.description}
                            </p>
                            <div className="flex justify-end items-center gap-5">
                              <div className="flex justify-center items-center gap-2">
                                {article.tags[0] ? (
                                  <span className="bg-[#D9D9D940] py-1 px-3 rounded-full text-xs">
                                    <Link href={"/tag/" + article.tags[0]}>
                                      {article.tags[0]}
                                    </Link>
                                  </span>
                                ) : null}
                                {article.tags[1] ? (
                                  <span className="bg-[#D9D9D940] py-1 px-3 rounded-full text-xs">
                                    <Link href={"/tag/" + article.tags[1]}>
                                      {article.tags[1]}
                                    </Link>
                                  </span>
                                ) : null}
                              </div>
                              <div>
                                <Link href={article.authorId}>
                                  <span className="text-xs">
                                    {article.authorId}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <Skeleton_expore />
      )}
    </div>
  );
};

export default MyComponent_TAg;
