"use client";
/* eslint-disable @next/next/no-img-element */
import Elements from "./Elements.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";

const MyComponent = ({ params }) => {
  const [blockNoteContent, setBlockNoteContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/article/${params.slug}`
        );
        if (response.data && response.data.content) {
          setBlockNoteContent(response.data.content);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchData();
  }, [params.slug]);

  // Creates a new editor instance.
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    initialContent: blockNoteContent,
  });

  return typeof window !== "undefined" ? (
    <article className="flex max-w-6xl justify-center items-center">
      <BlockNoteView
        editable={false}
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </article>
  ) : null;
};

export default MyComponent;
