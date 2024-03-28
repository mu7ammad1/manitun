"use client";
import React, { useState, useEffect, Suspense } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import GetArticle from "@/rendering/get/getArticle";
import Skeleton_expore from "@/components/Skeleton/Skeleton.expore";

interface ArticleData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  draft: boolean;
  createdAt: string;
  image?: string;
  author: {
    username: string;
    image: string;
  };
}

const ViewArticle = dynamic(() => import("@/components/View/ViewArticle"), {
  ssr: true,
});

export default function Articales() {
  const [articleData, setArticleData] = useState<ArticleData[] | null>(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      const data = await GetArticle(5); // جلب أول 5 عناصر
      setArticleData(data);
    };
    fetchArticleData();
  }, []);

  return (
    <div>
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

      <Suspense fallback={<Skeleton_expore />}>
        {articleData &&
          articleData.map((article: ArticleData) => (
            <ViewArticle
              key={article.id}
              id={article.id}
              created={article.createdAt}
              image={article.image}
              title={article.title}
              description={article.description}
              tags1={article.tags[0]}
              tags2={article.tags[1]}
              username={article.author.username}
              avatar={article.author.image}
            />
          ))}
      </Suspense>
    </div>
  );
}
