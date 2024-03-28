"use client";
import React, { useRef, useEffect, useState } from "react";
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

import dynamic from "next/dynamic";
import GetStory from "@/rendering/get/getStory";
import { Button } from "@/components/ui/button";

const ArticleShot = ({ params }) => {
  const editorInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] = useState(null);
  const [userData, setUserData] = useState(null);

  // GetStory
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const data = await GetStory({ slug: params.slug });
        setContentData(data.article.content);
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
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main className="bg-[#F8F6E3]">
          <div
            id="editorjs"
            className="dark:bg-stone-950 *:dark:text-white w-full px-5"
          ></div>
          <div>
            <div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/11829257/pexels-photo-11829257.jpeg"
                  alt="af"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div>
                <h1>mu7ammad osama</h1>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ArticleShot;
