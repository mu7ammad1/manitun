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

import "@/app/editor.css";

import GetStory from "@/rendering/get/getStory";
import dynamic from "next/dynamic";
import { FiLoader } from "react-icons/fi";
import User_more_section from "./user_more_section";

const HeetProfile = dynamic(() => import("./HeetProfile"), { ssr: false });
const User_details_section = dynamic(() => import("./user_details_section"), {
  ssr: false,
});

const ArticleShot = ({ params }) => {
  const editorInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState(null);
  const [contentData, setContentData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const data = await GetStory(params.slug);
        setArticleData(data.data);
        setContentData(data.data.content);
        setUserData(data.data.author);
        setLoading(false); // Set loading to false when data is available
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData();
  }, [params]);

  console.log(articleData);
  console.log(contentData);
  console.log(userData);

  // Editor.js
  useEffect(() => {
    if (!loading && contentData) {
      editorInstance.current = new EditorJS({
        holder: "ViewEditorJS",
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
    <main className="flex justify-center my-10">
      {loading ? (
        <span className="animate-spin">
          <FiLoader />
        </span>
      ) : articleData ? (
        <main className="max-w-4xl w-full px-4 my-3">
          <h1 className={`text-right text-2xl font-bold mb-3`}>
            {articleData.title}
          </h1>
          <Suspense fallback={`HeetProfile.....`}>
            <HeetProfile
              Author={userData.username}
              name={userData.name}
              date={articleData.createdAt}
              slug={params.slug}
            />
          </Suspense>
          <div
            id={`ViewEditorJS`}
            className="dark:bg-stone-950 *:dark:text-white w-full mb-5"
          ></div>
          <User_details_section Author={userData.username} />
          <User_more_section />
        </main>
      ) : (
        <span>Article not found.</span>
      )}
    </main>
  );
};

export default ArticleShot;
