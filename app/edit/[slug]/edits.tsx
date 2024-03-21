/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useMemo, useState } from "react";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import Skeleton_story from "@/components/Skeleton/Skeleton.story";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { enUS } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

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
        const response = await fetch(
          `https://manitun.vercel.app/api/article/${params}`
        );
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleInput = (event.target as HTMLFormElement).elements.namedItem(
      "title"
    );

    if (titleInput && "value" in titleInput) {
      const title = titleInput.value;
      if (title && editor) {
        const updatedContent = editor.document;
        // Call the function to update the article on the server
        await updateArticle(data.article.id, title, updatedContent);
      }
    } else {
      console.error("Input element does not have a 'value' property");
    }
  };

  if (editor === undefined) {
    return <Skeleton_story />;
  }

  if (loading) {
    return <Skeleton_story />;
  }

  if (!data) {
    return <div>Story not found</div>;
  }

  return (
    <main className="flex justify-center">
      <section className={cn("max-w-3xl w-full mt-10")}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="اكتب العنوان"
            className="w-full text-4xl font-semibold text-right mb-5"
            defaultValue={data.article.title}
          />

          <BlockNoteView
            onChange={() => {
              saveToStorage(editor.document);
            }}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            editor={editor}
            data-theming-css-demo
          />

          <input type="submit" className="w-full bg-stone-500 text-6xl" value={`ارسال`} />
        </form>
      </section>
    </main>
  );
}

async function updateArticle(
  articleId: string,
  title: string,
  updatedContent: any
) {
  try {
    const response = await fetch(
      `https://manitun.vercel.app/api/article/${articleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content: updatedContent }),
      }
    );

    if (response.ok) {
      console.log("Article updated successfully");
      // Optionally handle the response or perform any additional tasks after successful update
    } else {
      console.error("Failed to update article:", response.statusText);
      // Optionally handle the error response or display an error message to the user
    }
  } catch (error) {
    console.error("Error updating article:", error);
    // Optionally handle the error or display an error message to the user
  }
}
