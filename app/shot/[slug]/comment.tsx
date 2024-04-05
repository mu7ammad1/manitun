import React, { useState } from "react";
import axios from "axios";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import GetComments from "@/rendering/get/getComment";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { WEBSITEAPI } from "@/app/V";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FiLoader } from "react-icons/fi";

interface Comments {
  id: string;
  author: {
    name: string;
  };
  content: string;
  createdAt: string;
}
export default function Comment({ articleId }: { articleId: string }) {
  const user = useCurrentUser();
  const [comments, setComments] = useState<Comments[]>([]); // تحديد نوع البيانات للتعليقات
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [authorUsername, setAuthorUsername] = useState<string>(
    `${user?.username}`
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setSending(true);
      await axios.post(`${WEBSITEAPI}GetComment/${articleId}`, {
        content,
        authorUsername,
      });
      setContent("");
      setAuthorUsername(``);
      fetchComments();
      alert("تم ارسال التعليق بنجاح!");
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال التعليق:", error);
      alert("حدث خطأ أثناء إرسال التعليق!");
    } finally {
      setSending(false);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await GetComments(articleId);
      setComments(data.data.Comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger onClick={fetchComments}>
        <Button
          variant={"outline"}
          className="rounded-full bg-black/0 shadow-none border-none"
        >
          <ChatBubbleIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="z-[99999]">
        <SheetHeader>
          <SheetTitle>التعليقات</SheetTitle>
          <SheetDescription>
            {loading && (
              <span className="animate-spin">
                <FiLoader />
              </span>
            )}
            <div className="h-screen flex flex-col justify-between ">
              <div className="overflow-y-auto h-full">
                {!loading && (
                  <>
                    {comments.length === 0 && `.لا يوجد تعليقات حتى الآن`}
                    {comments.map((comment) => (
                      <div key={comment.id}>
                        <p>{comment.author.name}</p>
                        <p>{comment.content}</p>
                        <p>{comment.createdAt}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <form
                onSubmit={handleSubmit}
                className="mb-16 flex flex-col space-y-1"
              >
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="اكتب تعليقك هنا..."
                  rows={2}
                  disabled={sending}
                  className="w-full mx-[1px]"
                  dir="rtl"
                />
                <Button type="submit" disabled={sending}>
                  {sending ? "جاري الارسال..." : "ارسال"}
                </Button>
              </form>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
