"use client";
import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import GetTag from "@/rendering/get/getTag";
import Skeleton_expore from "@/components/Skeleton/Skeleton.expore";
import { Button } from "@/components/ui/button";

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
interface ApiResponse {
  message: string;
  data: ArticleData[];
}

const ViewArticle = dynamic(() => import("@/components/View/ViewArticle"), {
  ssr: true,
});

export default function Articles({ params }: { params: { slug: string } }) {
  const [articleData, setArticleData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const data = await GetTag({ slug: params.slug }); // استدعاء GetTag بواسطة السلاح
        setArticleData(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch article data:", error);
      }
    };
    fetchArticleData();
  }, [params.slug]);

  console.log(articleData);

  return (
    <div>
      <div className="py-5 bg-[#ffebb2]/80 flex flex-col justify-center">
        <h1 className="text-6xl text-center font-semibold my-12 dark:text-[#007F73]/100 uppercase">
          {decodeURIComponent(params.slug)}
        </h1>
        <div className="flex justify-center w-full pb-10">
          <Button variant={"outline"} className="w-4/12 border-none shadow-none">
            Follow
          </Button>
        </div>
      </div>

      <Suspense fallback={<Skeleton_expore />}>
        {articleData &&
          articleData.data.map(
            (article: ArticleData) =>
              article.draft && (
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
              )
          )}
      </Suspense>
    </div>
  );
}
