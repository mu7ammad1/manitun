/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, Key } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Skeleton_user from "@/components/Skeleton/Skeleton.user";
import { cn } from "@/lib/utils";
import { Mada } from "next/font/google";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import { toast } from "sonner";

const font = Mada({ subsets: ["arabic"], weight: "900" });
const font1 = Mada({ subsets: ["arabic"], weight: "500" });

export default function User({ params }: { params: { slug: string } }) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const Pathname = usePathname();

  const user = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://manitun.vercel.app/api/profile/${params.slug}`
        );
        if (response.status === 200) {
          setUserData(response.data);
          // تحديد حالة المتابعة عندما يكون المستخدم متابعًا بالفعل
          const isUserFollowing = response.data.user.following.some(
            (follower: any) => follower.followerUsername === user?.username
          );
          setIsFollowing(isUserFollowing);
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
  }, [params.slug, user?.username]);

  const followUser = async () => {
    try {
      const response = await axios.post(
        `https://manitun.vercel.app/api/profile/${params.slug}`,
        {
          followerUsername: user?.username,
          followingUsername: userData?.user?.username,
        }
      );

      if (response.status === 200) {
        setIsFollowing(true);
        setUserData((prevUserData:any) => ({
          ...prevUserData,
          user: {
            ...prevUserData.user,
            following: [
              ...prevUserData.user.following,
              { followerUsername: user?.username },
            ],
          },
        }));
        toast("تم إرسال المتابعة بنجاح", {
          description: Date(),
          duration: 5000,
        });
      } else {
        console.error("Failed to follow user");
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unfollowUser = async () => {
    try {
      if (
        !userData ||
        !userData.user ||
        !userData.user.following ||
        userData.user.following.length === 0
      ) {
        console.error("User data or following list is not available");
        return;
      }

      const response = await axios.delete(`https://manitun.vercel.app/api/follow`, {
        data: {
          followingUsername: userData.user.username,
          followerUsername: user?.username,
        },
      });

      if (response.status === 200) {
        setIsFollowing(false);
        setUserData((prevUserData:any) => ({
          ...prevUserData,
          user: {
            ...prevUserData.user,
            following: prevUserData.user.following.filter(
              (follower:any) => follower.followerUsername !== user?.username
            ),
          },
        }));
        toast("تم إلغاء المتابعة بنجاح", {
          description: Date(),
          duration: 5000,
        });
      } else {
        console.error("Failed to unfollow user");
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  if (loading) {
    return <Skeleton_user />;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <main className="flex justify-center">
      <section className="gap-3 flex justify-center flex-row max-w-6xl h-auto w-full my-7 mx-5 max-lg:block">
        <div className="basis-96 py-5 px-3 rounded-3xl bg-stone-100 h-min flex justify-center max-lg:mb-5 sticky top-4 max-lg:static">
          <div className="w-full">
            <div className="flex justify-end w-full max-lg:justify-center">
              <Link href={`/${userData.user.username}`}>
                <img
                  src={userData.user.image}
                  alt={`${userData.user.image}`}
                  className="w-24 h-24 rounded-full flex justify-center items-center text-center"
                />
              </Link>
            </div>
            <div className="flex justify-end w-full max-lg:justify-center mb-2">
              <div className="my-1 mx-5">
                <Link href={`/${userData.user.username}`}>
                  <h1 className="text-2xl w-full font-medium text-right max-lg:text-center my-2 font-sans mb-4">
                    {userData.user.name}
                  </h1>
                </Link>
                <h1 className="text-sm font-normal text-right max-lg:text-center">
                  {userData.user.bio}
                </h1>
              </div>
            </div>

            <div className="text-right">
              <h2>عدد المتابعين: {userData.user.following.length}</h2>
            </div>
            {user ? (
              <div className="flex justify-end max-lg:justify-center">
                {Pathname === `/${user?.username}` ? (
                  <div className="flex justify-center items-center my-5 w-full gap-2">
                    <Button className="bg-emerald-800 w-min rounded-full hover:bg-stone-800 max-lg:w-min px-5">
                      <Link href={`/settings`}>تعديل</Link>
                    </Button>
                    <Button className="bg-stone-800 w-full rounded-full hover:bg-stone-800 max-lg:w-52 ease-in duration-300">
                      لا يمكنك متابعة نفسك
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-center items-center my-5 w-full gap-2">
                    {isFollowing !== true ? (
                      <Button
                        className={`bg-emerald-500 w-full rounded-full hover:bg-stone-800 max-lg:w-52`}
                        onClick={followUser}
                      >
                        {isFollowing ? "unfollow" : "متابعة"}
                      </Button>
                    ) : (
                      <Button
                        className={`bg-emerald-500 w-full rounded-full hover:bg-stone-800 max-lg:w-52`}
                        onClick={unfollowUser}
                      >
                        {isFollowing ? "unfollow" : "متابعة"}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center my-5 w-full gap-2">
                <Button className="bg-emerald-800 w-min rounded-full hover:bg-stone-800 max-lg:w-min px-5">
                  <Link href={`/auth/login`}>انت غير عضو</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="basis-full space-y-5">
          {userData.articles.filter(
            (article: { draft: any }) => article.draft.toString() === "true"
          ).length === 0 && <p>لا يوجد مقالات حتى الآن</p>}
          {userData.articles.filter(
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
                      <Link href={`story/${article.id}`}>
                        <div className="flex justify-center items-center hover:bg-stone-100 rounded-3xl ease-in duration-200">
                          <div className="flex w-full justify-center items-center max-w-6xl max-lg:block ">
                            <div className="w-full max-w-full flex *:text-right p-2 group max-sm:flex-col-reverse">
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
                              <div className="basis-1/2 w-full">
                                {article.image ? (
                                  <div className="flex justify-center w-full">
                                    <img
                                      src={article.image}
                                      alt={`mantun.com - ` + article.authorId}
                                      className="w-full p-2 h-[154px] max-sm:h-[240px] max-md:h-[110px] object-cover object-center rounded-xl group-hover:scale-105 scale-100 group-hover:ease-in duration-300"
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
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
