/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, Key } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function User({ params }: { params: { user: string } }) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://manitun.vercel.app/api/profile/${params.user}`
        );
        if (response.ok) {
          const data = await response.json();
          // setUserData(data);
          setUserData(data);
          console.log(data.user);
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
  }, [params.user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }
  console.log(userData.articles);

  return (
    <main className="flex justify-center">
      <section className="gap-3 grid grid-cols-3 max-w-7xl w-full my-7 mx-5 max-md:block">
        <div className="bg-emerald-400 bg-opacity-85 rounded-t-2xl h-fit max-md:mb-5">
          <div className="bg-rose-500/0 pt-9">
            <div className="bg-stone-100 rounded-t-2xl pl-3">
              <div className="flex justify-between -translate-y-2 items-end">
                <img
                  className="w-12 h-12 outline-2 outline-stone-100 outline rounded-full relative bottom-3"
                  src={userData.user.image}
                  alt={`${userData.user.name}`}
                />
                <Button
                  variant={"link"}
                  className="hover:bg-stone-300 mr-3 hover:no-underline px-10 text-teal-500"
                >
                  Following
                </Button>
              </div>
              <h3 className="font-medium text-lg  relative bottom-3">
                {userData.user.name}
              </h3>
              <p className="font-normal text-xs  relative bottom-2 mb-6 mx-2">
                {userData.user.bio}
              </p>

              <hr className="border-stone-300/80 pb-2 mr-4" />
              <div className="flex gap-5 pt-3 antialiased tracking-wide leading-7 list-decimal capitalize text-ellipsis">
                <p className="font-semibold text-stone-500/70 text-xs  relative bottom-3 cursor-pointer *:hover:text-emerald-500">
                  <span className="font-bold text-stone-900/70">230 </span>
                  <span>Following</span>
                </p>
                <p className="font-semibold text-stone-500/70 text-xs  relative bottom-3 cursor-pointer *:hover:text-emerald-500">
                  <span className="font-bold text-stone-900/70">230 </span>
                  <span>Following</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 h-full space-y-2">
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
                      <div className="grid grid-cols-4 max-w-7xl w-full rounded-lg p-3 group hover:bg-neutral-100 ease-out duration-300">
                        <div className="col-span-3">
                          <Link href={`/story/${article.id}`}>
                            <div className="flex gap-1 items-center">
                              <span className="text-sm font-light">
                                {formatDistanceToNow(
                                  new Date(article.createdAt),
                                  {
                                    addSuffix: true,
                                    locale: enUS,
                                  }
                                )}
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
                          <Link
                            href={`/story/${article.id}`}
                            className="flex justify-center"
                          >
                            <img
                              className="w-full h-28 object-cover object-center rounded-lg group-hover:scale-110 group-hover:shadow-[5px_5px_0px_0px_rgb(16,185,129)] ease-in duration-300"
                              src={article.image}
                              alt={article.title}
                            />
                          </Link>
                        ) : (
                          <div className="hidden"></div> // أو يمكنك استخدام أي كلاس آخر للتحكم في الظهور والإخفاء
                        )}
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

{
  /* <h2>article.title:{article.title}</h2>
                  <img src={article.image} alt={article.title} />
                  {article.titleurl}
                  <p>Created At: {article.description}</p>
                  <p>
                    Created At:
                    {format(new Date(article.createdAt), "yyyy-MM-dd h:mm a")}
                  </p>
                   {format(
                                new Date(article.createdAt),
                                "yyyy-MM-dd h:mm a"
                              )}
                  <p>
                    Created:
                    {formatDistanceToNow(new Date(article.createdAt), {
                      addSuffix: true,
                      locale: arEG,
                    })}
                  </p> */
}
{
  /* <div>
                              <h2>{article.title}</h2>
                              <img src={article.image} alt={article.title} />
                              <a href={"story/" + article.id}>Read more</a>
                              <p>
                                Created:
                                {formatDistanceToNow(
                                  new Date(article.createdAt),
                                  {
                                    addSuffix: true,
                                    locale: arEG,
                                  }
                                )}
                              </p>
                            </div> */
}
