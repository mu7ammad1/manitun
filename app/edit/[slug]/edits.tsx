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
  const user = useCurrentUser();

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