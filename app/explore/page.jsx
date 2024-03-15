/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";

function MyComponent({ params }) {
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
    const response = await axios.get(`http://localhost:3000/api/article`, {
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
    <div className="">
      <div className="h-52 w-full"></div>
      {data !== null ? (
        <div className="col-span-2 h-full space-y-2">
          {data.length === 0 && <p>لا يوجد مقالات حتى الآن</p>}
          {data.length > 0 && (
            <>
              {data.map((article, id) => (
                <div key={id} className="">
                  <div className="grid grid-cols-4 max-w-7xl w-full rounded-lg p-3 group hover:bg-neutral-100 ease-out duration-300">
                    <div className="col-span-3">
                      <Link href={`/story/${article.id}`}>
                        <div className="flex gap-1 items-center">
                          <span className="text-sm font-light">
                            {formatDistanceToNow(new Date(article.createdAt), {
                              addSuffix: true,
                              locale: enUS,
                            })}
                          </span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-wide capitalize line-clamp-2">
                          {article.title}
                        </h1>
                        <p className="text-sm font-normal my-2 antialiased italic ordinal slashed-zero tabular-nums tracking-wide -tracking-2 line-clamp-3 leading-relaxed capitalize	">
                          {article.description}
                        </p>
                        <div className="flex justify-start items-center gap-3 *: *:bg-stone-100 *:px-3 *:rounded-full *:font-extralight *:text-sm">
                          <Link
                            href={`/search/${article.tags[0]}`}
                            className="hover:bg-stone-800 hover:text-white ease-in duration-200"
                          >
                            <p className="">{article.tags[0]}</p>
                          </Link>
                          <Link
                            href={`/search/${article.tags[1]}`}
                            className="hover:bg-stone-800 hover:text-white ease-in duration-200"
                          >
                            <p>{article.tags[1]}</p>
                          </Link>
                        </div>
                      </Link>
                    </div>
                    {article.image ? (
                      <div className="flex justify-center">
                        <img
                          className="w-full h-28 object-cover object-center rounded-lg group-hover:scale-110 group-hover:shadow-[5px_5px_0px_0px_rgb(16,185,129)] ease-in duration-300"
                          src={article.image}
                          alt={article.title}
                        />
                      </div>
                    ) : (
                      <div className="hidden"></div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="h-full">جاري التحميل...</div>
      )}
    </div>
  );
}

export default MyComponent;
