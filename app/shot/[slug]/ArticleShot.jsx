"use client";
import React, { useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import Image from "@editorjs/image";
import Embed from "@editorjs/embed";
import Delimiter from "@editorjs/delimiter";
import Code from "@editorjs/code";
import Checklist from "@editorjs/checklist";
import dynamic from "next/dynamic";
import GetStory from "@/rendering/get/getStory";
import { Button } from "@/components/ui/button";

const ArticleShot = ({ params }) => {
  const editorInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const data = await GetStory({ slug: params.slug });
        setArticleData(data.article.content);
        setUserData(data.user);
        setLoading(false); // Set loading to false when data is available
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };
    fetchArticleData();
  }, [params.slug]);

  useEffect(() => {
    if (!loading && articleData) {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        readOnly: true,
        tools: {
          header: {
            class: Header,
            config: { placeholder: "عنوان" },
            shortcut: "CMD+SHIFT+H",
          },
          image: {
            class: Image,
            inlineToolbar: true,
            config: { placeholder: "صورة" },
          },
          inlineCode: { class: InlineCode, shortcut: "CMD+SHIFT+M" },
          list: { class: List, inlineToolbar: true, toolbox: true },
          paragraph: { class: Paragraph, inlineToolbar: true },
        },
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
        data: articleData[0],
        i18n: { direction: "rtl" },
      });

      console.log(articleData);

      return () => {
        if (
          editorInstance.current &&
          typeof editorInstance.current.destroy === "function"
        ) {
          editorInstance.current.destroy();
          editorInstance.current = null;
        }
      };
    }
  }, [loading, articleData]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main>
          <div
            id="editorjs"
            className="dark:bg-stone-800 mb-5 w-full *:dark:text-white"
          ></div>
           <div className="mb-5">
          <div className="flex justify-between items-center">
            <div className="flex justify-end items-center gap-3 ">
              <Button
                variant={"default"}
                className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
              >
                asf
              </Button>
              <Button
                variant={"default"}
                className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
              >
                da
              </Button>
              <Button
                variant={"default"}
                className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
              >
                SheetComments
              </Button>
            </div>
            <div className="flex justify-end items-center gap-3 ">
              <div>
                <h6 className="text-base font-light hover:underline">
                  {/* <Link href={`/${data.article.author.username}`}> */}
                    {data.article.author.name}
                  {/* </Link> */}
                </h6>
                <div className="flex justify-end items-center gap-3">
                  <button className="text-sm font-thin hover:text-emerald-500 flex hover:underline underline-offset-8 decoration-emerald-500">
                    متابعة
                  </button>
                  <h6 className="text-sm font-extralight">
                    {/* {formatDistanceToNow(new Date(data.article.createdAt), {
                      addSuffix: true,
                      locale: enUS,
                    })} */}
                    time
                  </h6>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={``}
                alt="img profile"
                className="w-11 h-11 rounded-full"
              />
            </div>
          </div>
        </div>
        </main>
      )}
    </>
  );
};

export default ArticleShot;
