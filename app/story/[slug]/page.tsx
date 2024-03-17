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

export default function User({ params }: { params: { slug: string } }) {
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
          `https://manitun.vercel.app/api/article/${params.slug}`
        );
        if (response.ok) {
          const data = await response.json();
          setData(data);
          setContent(data.content);
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
  }, [params.slug]);

  const [content, setContent] = useState();
  const { resolvedTheme } = useTheme();

  // Loads the previously stored editor contents.
  useEffect(() => {
    setInitialContent(content);
  }, [content]);

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
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

  console.log(content);

  return (
    <main className="flex justify-center">
      <section className={cn("max-w-5xl w-full")}>
        <h1 className="text-6xl mb-1 px-5">{data.title}</h1>
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
      </section>
    </main>
  );
}
