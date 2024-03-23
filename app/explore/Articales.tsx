/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import Skeleton_expore from "@/components/Skeleton/Skeleton.expore";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  description: string;
  tags: string[];
  draft: boolean;
  createdAt: string;
  authorId: string;
  image?: string;
  author: {
    id: string;
    image: string;
  };
}

function Articales(): JSX.Element {
  const [data, setData] = useState<Article[] | null>(null);

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function fetchData(): Promise<void> {
    try {
      const response = await axios.get<{ data: Article[] }>(
        `https://manitun.vercel.app/api/article`,
        {
          headers: {
            "use-client": "true",
          },
        }
      );

      const userData = response.data; // Assuming data structure matches Article[]
      const randomData = shuffleArray(
        userData.data.filter((article) => article.draft)
      );

      setData(randomData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Carousel className="mt-0">
        <CarouselContent className="px-10 gap-3 flex">
          {data !== null ? (
            <>
              {data
                .reduce<string[]>((allTags, article) => {
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
            <span>Loading......</span>
          )}
        </CarouselContent>
      </Carousel>
      <div className="my-20">
        <h1 className="text-4xl text-center font-semibold my-12">
          استكشف شغفك
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

      {data !== null ? (
        <div className="col-span-2 h-full space-2">
          {data.length === 0 && <p>لا يوجد مقالات حتى الآن</p>}
          {data.length > 0 && (
            <>
              {data.map((article, id) => (
                <div key={id} className="border-t-[0.5px]  border-stone-200 hover:bg-stone-50">
                  <Link href={"/story/" + article.id}>
                    <div className="flex justify-center items-center">
                      <div className="flex w-full justify-center items-center max-w-6xl">
                        <div className="basis-[256px]  max-xl: hidden">fga</div>
                        <div className="w-full max-w-full flex *:text-right p-2 group max-sm:block">
                          <div className="basis-1/2 rounded-md">
                            {article.image ? (
                              <div className="flex justify-center">
                                <img
                                  src={article.image}
                                  alt={`mantun.com - ` + article.authorId}
                                  className="w-full p-2 h-[164px] max-h-40 max-sm:h-full max-md:h-[164px] object-cover object-center rounded-xl group-hover:scale-105 scale-100 group-hover:ease-in duration-300"
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
                            <h1 className="text-xl font-normal hover:underline hover:underline-offset-8 decoration-emerald-600 mb-3">
                              <Link href={`/story/${article.id}`}>
                                {article.title}
                              </Link>
                            </h1>
                            <p className="text-xs font-light italic  text-right -indent-8 pl-5 mb-3">
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
                                <div className="flex gap-3 justify-center items-center">
                                  <Link href={article.authorId}>
                                    <span className="text-xs">
                                      {article.authorId}
                                    </span>
                                  </Link>
                                  <Link href={article.authorId}>
                                    <img
                                      src={article.author.image}
                                      alt="name"
                                      className="w-5 h-5 rounded-full"
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
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
}

export default Articales;
