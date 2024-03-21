/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, Key } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Mada } from "next/font/google";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import Skeleton_ana from "@/components/Skeleton/Skeleton.ana";
import { CiEdit } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const font = Mada({ subsets: ["arabic"], weight: "900" });
const font1 = Mada({ subsets: ["arabic"], weight: "500" });

export default function User({ params }: { params: { user: string } }) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const Pathname = usePathname();

  const user = useCurrentUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://manitun.vercel.app/api/profile/${user?.username}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setUserData(null); // Reset user data if not found
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);

        setLoading(false);
      }
    };

    fetchData();
  }, [user?.username]);

  const handleDeleteArticle = async (id: Key) => {
    try {
      const response = await fetch(`https://manitun.vercel.app/api/article/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Reload user data after successful deletion
        const data = await response.json();
        setUserData(data);
        window.location.reload();
      } else {
        console.error("Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // في useEffect، استخدم userData لتحديث حالة التحميل بعد تحميل البيانات
  useEffect(() => {
    if (userData) {
      setLoading(false); // Stop loading once data is fetched
    }
  }, [userData]);

  if (loading) {
    return <Skeleton_ana />;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <main className="flex justify-center">
      <section className="gap-3 flex justify-center flex-row max-w-6xl w-full my-7 mx-5 max-lg:block">
        <div className="basis-full space-y-5">
          {userData &&
            userData.articles &&
            userData.articles.filter(
              (article: { draft: any }) => article.draft.toString() === "true"
            ).length === 0 && <p>لا يوجد مقالات حتى الآن</p>}

          {userData &&
            userData.articles &&
            userData.articles.filter(
              (article: { draft: any }) => article.draft.toString() === "true"
            ).length > 0 && (
              <>
                {userData.articles
                  .filter(
                    (article: { draft: any }) =>
                      article.draft.toString() === "true"
                  )
                  .sort(
                    (a: any, b: any) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map(
                    (article: {
                      id: Key;
                      titleurl: any;
                      title: any;
                      image: any;
                      content: any[];
                      authorId: any;
                      createdAt: any;
                      updatedAt: any;
                      description: any;
                      tags: any;
                      draft: { toString: () => any };
                    }) => (
                      <div key={article.id} className="">
                        <div className="flex justify-center">
                          <div className="flex w-full justify-center max-w-6xl max-lg:block ">
                            <div className="w-full max-w-full flex *:text-right p-2 group max-sm:flex-col-reverse">
                              <div className="basis-full px-5">
                                <div className="flex justify-between items-center">
                                  <p className="text-sm">
                                    {formatDistanceToNow(
                                      new Date(article.createdAt),
                                      {
                                        addSuffix: true,
                                        locale: enUS,
                                      }
                                    )}
                                  </p>
                                </div>
                                {article.title ? (
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
                                ) : (
                                  <h1
                                    className={cn(
                                      font.className,
                                      "text-xl font-normal hover:underline hover:underline-offset-8 decoration-emerald-600 mb-3"
                                    )}
                                  >
                                    <Link href={`/story/${article.id}`}>
                                      لا يوجد عنوان محدد
                                    </Link>
                                  </h1>
                                )}
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
                                </div>
                              </div>
                              <div className="basis-1/2">
                                {article.image ? (
                                  <div className="flex justify-center">
                                    <img
                                      src={article.image}
                                      alt={`mantun.com - ` + article.authorId}
                                      className="w-full p-2 h-[154px] max-sm:h-[240px] max-md:h-[110px] object-cover object-center rounded-xl group-hover:scale-105 scale-100 group-hover:ease-in duration-300"
                                    />
                                  </div>
                                ) : null}
                                <div className="flex justify-end items-center gap-3 ">
                                  <Dialog>
                                    <DialogTrigger>remove</DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          هل انت متاكد انك تريد حذف المقال؟
                                        </DialogTitle>
                                        <DialogDescription>
                                          انت علي وشك حذف مقال اذا حذفت هذا
                                          المقال لا يستطيع ارجاع هذا المقال
                                        </DialogDescription>
                                        <Button
                                          onClick={async () => {
                                            setIsLoading(true);
                                            await handleDeleteArticle(
                                              article.id
                                            );
                                            setIsLoading(false);
                                          }}
                                          className="bg-rose-500 text-sm w-full flex justify-center items-center gap-3 hover:bg-rose-800"
                                        >
                                          {isLoading ? (
                                            <div className="animate-spin text-lg">
                                              <FiLoader />
                                            </div>
                                          ) : (
                                            "remove"
                                          )}
                                        </Button>
                                      </DialogHeader>
                                    </DialogContent>
                                  </Dialog>
                                  <Link href={`/edit/${article.id}`}>
                                    <Button className="bg-teal-500 w-full flex justify-center items-center gap-3 hover:bg-teal-800">
                                      <p className="text-xl">
                                        <CiEdit />
                                      </p>
                                      <p className="text-sm">Edit</p>
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </>
            )}
        </div>
      </section>
    </main>
  );
}
