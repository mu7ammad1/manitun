/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useMemo, useState } from "react";
import Skeleton_story from "@/components/Skeleton/Skeleton.story";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Button } from "@/components/ui/button";
import { WEBSITE } from "@/app/V";

export default function Storys({ params }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState([]);
  const user = useCurrentUser();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleInput = (event.target as HTMLFormElement).elements.namedItem(
      "title"
    );
  };

  if (loading) {
    return <Skeleton_story />;
  }

  if (!data) {
    return <div>Story not found</div>;
  }
  console.log(data);

  return (
    <form onSubmit={handleSubmit}>
      <main className="flex justify-center">
        <section className={cn("max-w-3xl w-full mt-10")}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="اكتب العنوان"
            className="w-full text-4xl font-semibold text-right mb-5 h-full"
            defaultValue={data.article.title}
            disabled={data.article.authorId === user?.username ? true : false}
          />

          {data.article.authorId === user?.username ? (
            <Button type="submit">إنشاء المقال</Button>
          ) : null}
        </section>
      </main>
    </form>
  );
}

async function updateArticle(
  articleId: string,
  title: string,
  updatedContent: any
) {
  try {
    const response = await fetch(`${WEBSITE}/api/article/${articleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content: updatedContent }),
    });

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
