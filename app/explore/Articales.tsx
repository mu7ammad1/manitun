"use client";
import React, { useState, useEffect, Suspense } from "react";
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
  console.log(articleData);

  return (
    <div>
      <div className="py-24 bg-[#ffebb2]/80">
        <h1 className="text-6xl text-center font-semibold my-12 dark:text-[#007F73]/100">
          استكشف شغفك
        </h1>
      </div>

      <Suspense fallback={<Skeleton_expore />}>
        {articleData &&
          articleData.map(
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
