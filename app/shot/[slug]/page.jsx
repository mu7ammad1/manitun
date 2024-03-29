"use client";
import React, { useRef, useEffect, useState, Suspense } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Delimiter from "@editorjs/delimiter";
import Code from "@editorjs/code";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";

import GetStory from "@/rendering/get/getStory";
import dynamic from "next/dynamic";

const Follow = dynamic(() => import("./follow"));
const Comment = dynamic(() => import("./comment"));

const ArticleShot = ({ params }) => {
  const editorInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState(null);
  const [contentData, setContentData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const data = await GetStory({ slug: params.slug });
        setContentData(data.article.content);
        setArticleData(data.article);
        setUserData(data.user);
        setLoading(false); // Set loading to false when data is available
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData();
  }, [params.slug]);
  // Editor.js
  useEffect(() => {
    if (!loading && contentData) {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        readOnly: true,
        tools: {
          header: {
            class: Header,
            config: { placeholder: "عنوان" },
            shortcut: "CMD+SHIFT+H",
          },
          quote: Quote,
          image: {
            class: ImageTool,
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
        data: contentData[0],
        i18n: { direction: "rtl" },
      });
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
  }, [loading, contentData]);
  return (
    <main className="flex justify-center">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <main className="max-w-4xl">
          <h1 className={`text-right text-2xl font-bold py-5`}>
            {articleData.title}
          </h1>
          <div
            id="editorjs"
            className="dark:bg-stone-950 *:dark:text-white w-full"
          ></div>

          <Suspense fallback={<span>Comment.....</span>}>
            <Comment articleId={params.slug} />
          </Suspense>
          <Suspense fallback={<span>Follow.....</span>}>
            <Follow IdAuthor={articleData.authorId} />
          </Suspense>
        </main>
      )}
    </main>
  );
};

export default ArticleShot;
