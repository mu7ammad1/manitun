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
        <main className="bg-emerald-500">
          <div
            id="editorjs"
            className="dark:bg-stone-800 *:dark:text-white w-full "
          ></div>
          <div>
            
          </div>
        </main>
      )}
    </>
  );
};

export default ArticleShot;
