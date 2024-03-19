/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import Skeleton_expore from "@/components/Skeleton/Skeleton.expore";
import { Elements_two } from "@/components/Elements/ElementsAll";
import { cn } from "@/lib/utils";
import { Mada } from "next/font/google";

const font = Mada({ subsets: ["arabic"], weight: "900" });
const font1 = Mada({ subsets: ["arabic"], weight: "500" });

function MyComponent() {
  const [data, setData] = useState(null);

  // دالة ترتيب البيانات عشوائيًا باستخدام Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  // دالة استدعاء البيانات
  async function fetchData() {
    try {
      const response = await axios.get(`https://manitun.vercel.app/api/article`, {
        headers: {
          "use-client": "true",
        },
      });

      const userData = response.data; // افترض أنه تم تخزين البيانات في userData.articles

      // ترتيب البيانات عشوائيًا باستخدام Fisher-Yates shuffle algorithm
      const randomData = shuffleArray(
        userData.data.filter((article) => article.draft.toString() === "true")
      );

      setData(randomData);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب البيانات:", error);
    }
  }

  // استدعاء fetchData() عند تحميل الصفحة
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data !== null ? (
        <div className="col-span-2 h-full space-y-2">
          {data.length === 0 && <p>لا يوجد مقالات حتى الآن</p>}
          {data.length > 0 && (
            <>
              {data.map((article, id) => (
                <div key={id} className="">
                  <div className="flex justify-center items-center">
                    <div className="flex w-full justify-center items-center max-w-6xl max-lg:block ">
                      <div className="basis-[256px]  max-xl: hidden">fga</div>
                      <div className="w-full max-w-full flex *:text-right p-2 group max-sm:block">
                        <div className="basis-1/2">
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
                            {formatDistanceToNow(new Date(article.createdAt), {
                              addSuffix: true,
                              locale: enUS,
                            })}
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

export default MyComponent;
