"use client";
import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import GetArticle from "@/rendering/get/getArticle";
import Skeleton_expore from "@/components/Skeleton/Skeleton.expore";
import Forehead from "../shot/[slug]/forehead";
import ViewCarousel from "@/components/View/ViewCarousel";

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
    <main>
      <Suspense fallback={`Forehead....`}>
        <Forehead text={`استكشف شغفك`} />
      </Suspense>
      <Suspense fallback={`ViewCarousel...`}>
        <ViewCarousel />
      </Suspense>
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
    </main>
  );
}
