"use client";
import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import GetTag from "@/rendering/get/getTag";
import Skeleton_expore from "@/components/Skeleton/Skeleton.expore";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { WEBSITEAPI } from "@/app/V";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FiLoader } from "react-icons/fi";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [following, setFollowing] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(true); // إضافة حالة جديدة للتحميل

  const user = useCurrentUser();

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoadingData(true); // قم بتعيين حالة التحميل إلى true عند بدء عملية الاسترجاع

      try {
        const data = await GetTag({ slug: params.slug }); // استدعاء GetTag بواسطة السلاح
        setArticleData(data);
        console.log(data);
        setLoadingData(false);

        // جلب بيانات tagFollow
        const response = await axios.get(
          `${WEBSITEAPI}TagFollow/${user?.username}`
        );
        const tagFollowData = response.data.tagFollow;
        console.log(tagFollowData);

        // مقارنة بيانات tagFollow مع المستخدم الحالي
        if (
          tagFollowData &&
          tagFollowData.some(
            (item: any) =>
              item.tag === params.slug && item.userId === user?.username
          )
        ) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      } catch (error) {
        console.error("Failed to fetch article data:", error);
      }
    };
    fetchArticleData();
  }, [params.slug, user?.username]);

  const handleFollow = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${WEBSITEAPI}TagFollow`, {
        tag: params.slug,
        userId: user?.username, // يجب استبداله بمعرف المستخدم الفعلي
      });

      console.log(response.data);

      setFollowing(true);
    } catch (error: any) {
      console.error(error.response?.data);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`${WEBSITEAPI}TagFollow`, {
        data: {
          tag: params.slug,
          userId: user?.username, // يجب استبداله بمعرف المستخدم الفعلي
        },
      });

      console.log(response.data);
      setFollowing(false);
    } catch (error: any) {
      console.error(error.response?.data);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Suspense fallback={`Forehead....`}>
        <div className="py-10 bg-[#ffebb2]/80">
          <h1 className="text-6xl max-md:text-4xl text-center font-semibold my-12 dark:text-[#007F73]/100 uppercase">
            {decodeURIComponent(params.slug)}
          </h1>
          <div className="flex justify-center w-full">
            {error && <p>Error: {error}</p>}
            {loadingData ? (
              <Button variant={"secondary"} className="w-1/2">
                <p className="animate-spin">
                  <FiLoader />
                </p>
              </Button>
            ) : (
              <>
                {error && <p>Error: {error}</p>}
                {following ? (
                  <Button
                    variant={"secondary"}
                    onClick={handleUnfollow}
                    disabled={loading}
                    className="w-1/2"
                  >
                    {loading ? "Unfollowing..." : "Unfollow"}
                  </Button>
                ) : (
                  <Button
                    variant={"secondary"}
                    onClick={handleFollow}
                    disabled={loading}
                    className="w-1/2"
                  >
                    {loading ? "Following..." : "Follow"}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </Suspense>

      <Suspense fallback={<Skeleton_expore />}>
        {articleData &&
          articleData.data.map(
            (article: ArticleData) =>
              article.draft === true && (
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
