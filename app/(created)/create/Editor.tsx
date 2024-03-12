"use client";
/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  DefaultReactSuggestionItem,
  useCreateBlockNote,
  SuggestionMenuController,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import {
  Block,
  BlockNoteSchema,
  defaultInlineContentSpecs,
  filterSuggestionItems,
} from "@blocknote/core";
import { Mention } from "@/components/Mention/Mention";
import { toast, useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";

const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    mention: Mention,
  },
});

const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor
): DefaultReactSuggestionItem[] => {
  const users = ["Steve", "Bob", "Joe", "Mike"];

  return users.map((user) => ({
    title: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: "mention",
          props: {
            user,
          },
        },
        " ", // add a space after the mention
      ]);
    },
  }));
};

type FormData = {
  title: string;
  id: string;
  description: string;
  image: string;
  authorId: any;
  draft: boolean;
  tags: string;
  content: any[];
};

export default function EditorUi() {
  const user = useCurrentUser();

  const [blocks, setBlocks] = useState<Block[]>([]);
  const editor = useCreateBlockNote({
    schema,
    initialContent: [{}],
  });
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  const generateIdFromTitle = (title: string) => {
    return title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
  };

  const [formData, setFormData] = useState<FormData>({
    authorId: user?.username,
    description: "",
    id: "",
    image: "",
    tags: "",
    title: "",
    draft: true,
    content: [],
  });

  type FileInputEvent = React.ChangeEvent<
    HTMLInputElement & { files: FileList }
  >;

  const handleChange = (event: FileInputEvent) => {
    const { name, value, type, files } = event.target;

    if (type === "file" && files && files.length > 0) {
      // تحميل الصورة وتحويلها إلى سلسلة base64
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        setFormData({
          ...formData,
          [name]: e.target.result,
        });
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      // تحويل قيمة الـ tags إلى مصفوفة بواسطة الفاصلة ","
      const tagsArray = formData.tags
        .split(",")
        .map((tag: string) => tag.trim());

      // إنشاء البيانات الجديدة المطلوبة للإرسال
      const formDataToSend = {
        ...formData,
        id: generateIdFromTitle(formData.title) + "-" + generateRandomId(),
        tags: tagsArray,
        content: blocks,
        authorId: user?.username,
      };

      // إرسال البيانات إلى الخادم
      const response = await axios.post(
        "https://manitun.vercel.app/api/profile",
        formDataToSend
      );
      console.log("تم إنشاء المقال بنجاح:", response.data);

      toast({
        title: "تم إرسال المقال بنجاح",
        duration: 5000, // مدة ظهور الرسالة بالميلي ثانية (5 ثواني)
      });
      // إعادة تعيين حقول الإدخال
      setFormData({
        authorId: user?.username,
        description: "",
        id: "",
        image: "",
        tags: "",
        title: "",
        draft: true,
        content: [],
      });
    } catch (error: any) {
      console.error("حدث خطأ أثناء إنشاء المقال:", error.response.data);
      // عرض رسالة خطأ باستخدام shadcn
      toast({
        title: "حدث خطأ",
        description: "حدثت مشكلة أثناء إرسال المقال. الرجاء المحاولة مرة أخرى.",
        duration: 5000, // مدة ظهور الرسالة بالميلي ثانية (5 ثواني)
      });
    }
  };

  return (
    <div>
      <Tabs defaultValue="Editor" className="w-full h-full">
        <TabsList className="fixed bottom-0">
          <TabsTrigger value="Publish">Publish</TabsTrigger>
          <TabsTrigger value="Editor">Editor</TabsTrigger>
        </TabsList>
        <form onSubmit={handleSubmit} className="p-4">
          <TabsContent value="Editor" className="">
            <input
              type="text"
              placeholder="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-none focus-within:border-none outline-none text-7xl pr-3 pl-12 py-1 font-extrabold placeholder:text-[#efefef] w-full"
            />
            <BlockNoteView
              editor={editor}
              onChange={() => {
                setBlocks(editor.document as Block[]);
              }}
            >
              <SuggestionMenuController
                triggerCharacter={"@"}
                getItems={async (query) =>
                  filterSuggestionItems(getMentionMenuItems(editor), query)
                }
              />
            </BlockNoteView>
          </TabsContent>
          <TabsContent value="Publish">
            <input
              type="text"
              placeholder="authorId"
              name="authorId"
              value={formData.authorId}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 mb-4 hidden"
            />
            <input
              type="text"
              placeholder="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 mb-4 hidden"
            />

            <input
              type="text"
              placeholder="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />

            <input
              type="file"
              accept="image/*"
              placeholder="image"
              name="image"
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />

            <input
              type="text"
              placeholder="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />

            <img
              src={formData.image}
              alt="صورة المقال"
              className="max-w-full mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              إنشاء المقال
            </button>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
