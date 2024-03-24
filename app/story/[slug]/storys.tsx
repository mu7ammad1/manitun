/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useMemo, useState } from "react";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import Skeleton_story from "@/components/Skeleton/Skeleton.story";
import { cn } from "@/lib/utils";
import "./story.css";
import { useTheme } from "next-themes";
import { enUS } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CiBookmarkPlus, CiShare1, CiShare2 } from "react-icons/ci";
import { FaRegComments } from "react-icons/fa6";
import {
  FaCopy,
  FaFacebook,
  FaHeart,
  FaTwitch,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { WEBSITE } from "@/app/V";
import { toast } from "sonner";

async function saveToStorage(jsonBlocks: Block[]) {
  // Save contents to local storage. You might want to debounce this or replace
  // with a call to your API / database.
  localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
}

async function loadFromStorage() {
  // Gets the previously stored editor contents.
  const storageString = localStorage.getItem("editorContent");
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default function Storys({ params }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState<Block[]>([]);

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${WEBSITE}/api/article/${params}`);
        if (response.ok) {
          const data = await response.json();
          setData(data);
          setContent(data.article.content);
        } else {
          setData(null); // Reset user data if not found
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);

        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const [content, setContent] = useState();
  const { resolvedTheme } = useTheme();

  // Loads the previously stored editor contents.
  useEffect(() => {
    setInitialContent(content);
  }, [content]);

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  if (editor === undefined) {
    return <Skeleton_story />;
  }

  if (loading) {
    return <Skeleton_story />;
  }

  if (!data) {
    return <div>Story not found</div>;
  }

  const SheetComments = (
    <Sheet>
      <SheetTrigger>
        <FaRegComments />
      </SheetTrigger>
      <SheetContent className="z-[99999]">
        <SheetHeader>
          <SheetTitle>التعليقات</SheetTitle>
          <SheetDescription>
            <div className="mt-5">
              {data.article.Comments.length === 0
                ? "لا يوجد تعليقات حتي الان"
                : data.article.Comments.map((comment: any, index: any) => (
                    <div key={index} className="border-b border-gray-200 py-4">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-end w-full gap-3">
                          <div className="ml-4 flex items-center gap-3">
                            <p className="text-xs font-extralight text-gray-500">
                              {formatDistanceToNow(
                                new Date(comment.createdAt),
                                {
                                  addSuffix: true,
                                  locale: enUS,
                                }
                              )}
                            </p>
                            <Link href={`/${comment.author.username}`}>
                              <h3 className="text-base font-normal text-stone-900 hover:underline underline-offset-[10px] decoration-stone-800">
                                {comment.author.name}
                              </h3>
                            </Link>
                          </div>
                          <Link href={`/${comment.author.username}`}>
                            <img
                              src={comment.author.image}
                              alt="Profile"
                              className="w-8 h-8 rounded-full"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="mt-2 text-stone-950 text-right">
                        {comment.content}
                      </div>
                    </div>
                  ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
  const ShareBTN = (
    <Dialog>
      <DialogTrigger>
        <CiShare2 />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اختار طريقة المشاركة</DialogTitle>
          <DialogDescription className="grid grid-cols-3 max-md:grid-cols-2 mt-3">
            <Button
              className="p-3 bg-stone-50/0 shadow-none text-stone-900 flex justify-center items-center gap-3 hover:text-white"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast("تم نسخ الرابط بنجاح");
              }}
            >
              <FaCopy />
              <span>Copy</span>
            </Button>
            <Button
              className="p-3 bg-stone-50/0 shadow-none text-stone-900 flex justify-center items-center gap-3 hover:text-white"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/sharer/sharer.php?u=" +
                    encodeURIComponent(window.location.href)
                )
              }
            >
              <FaFacebook />
              <span>FaceBook</span>
            </Button>
            <Button
              className="p-3 bg-stone-50/0 shadow-none text-stone-900 flex justify-center items-center gap-3 hover:text-white"
              onClick={() =>
                window.open(
                  "https://twitter.com/intent/tweet?url=" +
                    encodeURIComponent(window.location.href)
                )
              }
            >
              <FaTwitter />
              <span>Twitter</span>
            </Button>
            <Button
              className="p-3 bg-stone-50/0 shadow-none text-stone-900 flex justify-center items-center gap-3 hover:text-white"
              onClick={() => window.open("https://www.twitch.tv/your_channel")}
            >
              <FaTwitch />
              <span>Twitch</span>
            </Button>
            <Button
              className="p-3 bg-stone-50/0 shadow-none text-stone-900 flex justify-center items-center gap-3 hover:text-white"
              onClick={() =>
                window.open(
                  "whatsapp://send?text=" +
                    encodeURIComponent(window.location.href)
                )
              }
            >
              <FaWhatsapp />
              <span>Whatsapp</span>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
  const SeeMore = (
    <Carousel className="mb-20">
      <CarouselContent className=" gap-3 flex">
        {data.userArticles.map((article: any, index: any) => (
          <CarouselItem key={index} className="basis-1/2 ">
            <Link href={`/story/${article.id}`}>
              <div className="py-2 px-2 my-5 group ease-out w-full duration-300 *:text-right hover:bg-stone-100 rounded-lg">
                <div>
                  {article.image ? (
                    <Link href={`/${article.id}`}>
                      <img
                        src={article.image}
                        alt={"manitun.com - asf"}
                        className="w-full h-[164px] max-sm:h-80 max-md:h-80 p-2 object-cover object-center rounded-xl group-hover:scale-105 scale-100 group-hover:ease-in duration-300"
                      />
                    </Link>
                  ) : null}
                </div>
                <div className="pt-2 pb-4 grid gap-2">
                  <p className="text-xs">
                    {formatDistanceToNow(new Date(article.createdAt), {
                      addSuffix: true,
                      locale: enUS,
                    })}
                  </p>

                  <h1 className={cn("text-xl font-medium  line-clamp-2")}>
                    <Link href={`/story/${article.id}`}>{article.title}</Link>
                  </h1>
                  <p
                    className={cn(
                      "text-xs font-extralight italic  text-right pl-2 line-clamp-4"
                    )}
                  >
                    {article.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    {article.tags[1] ? (
                      <span className="bg-[#D9D9D940] py-1 px-3 rounded-full text-xs">
                        <Link href={"/tag/" + article.tags[0]}>
                          {article.tags[0] ? article.tags[0] : null}
                        </Link>
                      </span>
                    ) : null}
                    {article.tags[1] ? (
                      <span className="bg-[#D9D9D940] py-1 px-3 rounded-full text-xs">
                        <Link href={"/tag/" + article.tags[1]}>
                          {article.tags[1] ? article.tags[1] : null}
                        </Link>
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );

  const Toople = (
    <div className="fixed bottom-5 left-1/2 right-1/2 flex justify-center">
      <div className="flex justify-end items-center bg-white/40 backdrop-blur-md px-2 gap-x-4 py-1 rounded-full">
        <Button
          variant={"default"}
          className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
        >
          <FaHeart />
        </Button>
        <Button
          variant={"default"}
          className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
        >
          <CiBookmarkPlus />
        </Button>
        <Button
          variant={"default"}
          className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-700 text-xl px-2 rounded-full"
        >
          {SheetComments}
        </Button>
      </div>
    </div>
  );
  return (
    <main className="flex justify-center">
      <section className={cn("max-w-3xl w-full mt-10")}>
        <h1 className="text-4xl font-semibold text-right mb-5">
          {data.article.title ? data.article.title : "لا يوجد عنوان هنا للاسف "}
        </h1>

        <div className="mb-5">
          <div className="flex justify-between items-center">
            <div className="flex justify-end items-center gap-3 ">
              <Button
                variant={"default"}
                className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
              >
                {ShareBTN}
              </Button>
              <Button
                variant={"default"}
                className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
              >
                <FaHeart />
              </Button>
              <Button
                variant={"default"}
                className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
              >
                {SheetComments}
              </Button>
            </div>
            <div className="flex justify-end items-center gap-3 ">
              <div>
                <h6 className="text-base font-light hover:underline">
                  <Link href={`/${data.article.author.username}`}>
                    {data.article.author.name}
                  </Link>
                </h6>
                <div className="flex justify-end items-center gap-3">
                  <button className="text-sm font-thin hover:text-emerald-500 flex hover:underline underline-offset-8 decoration-emerald-500">
                    متابعة
                  </button>
                  <h6 className="text-sm font-extralight">
                    {formatDistanceToNow(new Date(data.article.createdAt), {
                      addSuffix: true,
                      locale: enUS,
                    })}
                  </h6>
                </div>
              </div>
              <img
                src={data.article.author.image}
                alt="img profile"
                className="w-11 h-11 rounded-full"
              />
            </div>
          </div>
        </div>

        <BlockNoteView
          editable={false}
          formattingToolbar={false}
          imageToolbar={false}
          sideMenu={false}
          slashMenu={false}
          tableHandles={false}
          onChange={() => {
            saveToStorage(editor.document);
          }}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          editor={editor}
          data-theming-css-demo
        />

        <div className="bg-stone-100 p-5 rounded-lg">
          <div>
            <div>
              <Link href={`/${data.article.author.username}`}>
                <img
                  src={data.article.author.image}
                  alt=""
                  className="w-24 h-24 rounded-full object-cover object-center"
                />
              </Link>
              <h1 className="text-2xl font-normal mt-3">
                <Link href={`/${data.article.author.username}`}>
                  {data.article.author.username}
                </Link>
              </h1>
              <Button className="w-56 mt-2 rounded-full">متابعة</Button>
            </div>
          </div>
        </div>

        <h1 className="text-right text-2xl mt-4">مزيد من القصص 🔥</h1>
        {SeeMore}

        {Toople}
      </section>
    </main>
  );
}
