"use client";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Delimiter from "@editorjs/delimiter";
import Code from "@editorjs/code";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";


import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { WEBSITE } from "../V";

const cleanId = (inputId) => {
  // Remove leading and trailing spaces
  let cleanedId = inputId.trim();

  // Replace spaces with underscore
  cleanedId = cleanedId.replace(/\s+/g, "_");

  // Remove forward slash
  cleanedId = cleanedId.replace(/\//g, "");

  // Remove hyphen if it's adjacent to another hyphen
  cleanedId = cleanedId.replace(/-+/g, "-");

  // Remove hyphen from the beginning
  cleanedId = cleanedId.replace(/^-/, "");

  // Generate random number
  const randomNumber = Math.random().toString().replace("0.", "").substr(0, 9);

  // Append random number to the end of the cleanedId
  cleanedId = `${cleanedId}_${randomNumber}`;

  return cleanedId;
};
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });
};

export default function EditorUi() {
  const user = useCurrentUser();
  const { resolvedTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorInstance = useRef(null);
  const [jsonData, setJsonData] = useState(null);

  const [formData, setFormData] = useState({
    authorId: user?.username,
    description: "",
    id: "",
    image: "",
    tags: "",
    title: "",
    draft: true,
    content: jsonData ? jsonData.blocks : [],
  });

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file" && files && files.length > 0) {
      // تحميل الصورة وتحويلها إلى سلسلة base64
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
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
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clean and generate ID
    const cleanedId = cleanId(formData.title);

    if (!formData.title || formData.title.trim() === "") {
      toast("العنوان مطلوب", {
        description: "يجب إدخال عنوان قبل النشر",
        duration: 5000,
      });
      return; // لا تقم بالمتابعة في حالة عدم توفر عنوان
    }
    setIsSubmitting(true);

    try {
      // تحويل قيمة الـ tags إلى مصفوفة بواسطة الفاصلة ","
      const tagsArray = formData.tags.split(",").map((tag) => tag.trim());

      // إنشاء البيانات الجديدة المطلوبة للإرسال
      const formDataToSend = {
        ...formData,
        id: cleanedId,
        tags: tagsArray,
        content: jsonData ? [jsonData] : [], // تحديث القيمة content بناءً على البيانات المستقبلة من jsonData
        authorId: user?.username,
      };

      // إرسال البيانات إلى الخادم
      const response = await axios.post(
        `${WEBSITE}/api/profile`,
        formDataToSend
      );
      console.log("تم إنشاء المقال بنجاح:", response.data);

      toast("تم إرسال المقال بنجاح", {
        description: Date(),
        duration: 5000,
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
        content: jsonData ? jsonData.blocks : [], // تحديث القيمة content بناءً على البيانات المستقبلة من jsonData
      });
      setIsSubmitting(false);
      router.push("/");
    } catch (error) {
      console.error("حدث خطأ أثناء إنشاء المقال:", error.response.data);
      // عرض رسالة خطأ باستخدام shadcn
      toast("لم يتم إرسال المقال بنجاح", {
        description: "حدثت مشكلة أثناء إرسال المقال. الرجاء المحاولة مرة أخرى",
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    editorInstance.current = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "عنوان",
            levels: [1, 2, 3],
            defaultLevel: 2,
          },
          shortcut: "CMD+SHIFT+H",
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "https://manitun.vercel.app", // Your backend endpoint for url data fetching,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        image: {
          class: ImageTool,
          placeholder: "صورة",
          config: {
            uploader: {
              uploadByFile(file) {
                console.log("uploading");

                // تحميل الصورة وتحويلها إلى سلسلة Base64
                return new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onload = async (event) => {
                    const base64Image = event.target.result;
                    resolve({
                      success: 1,
                      file: { url: base64Image },
                    });
                  };
                  reader.readAsDataURL(file);
                });
              },
            },
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          toolbox: {
            title: "فقرة جديدة",
          },
        },
      },
      autofocus: true,
      onReady: () => {
        console.log("Editor.js is ready to work!");
      },
      placeholder: "!دعونا نكتب قصة رهيبة",

      data: {},

      i18n: {
        direction: "rtl",
        /**
         * @type {I18nDictionary}
         */
        messages: {
          ui: {
            blockTunes: {
              toggler: {
                "Click to tune": "Нажмите, чтобы настроить",
                "or drag to move": "или перетащите",
              },
            },
            inlineToolbar: {
              converter: {
                "Convert to": "Конвертировать в",
              },
            },
            toolbar: {
              toolbox: {
                Add: "Добавить",
              },
            },
          },

          toolNames: {
            Text: "Параграф",
            Heading: "عنوان",
            List: "Список",
            Warning: "Примечание",
            Checklist: "Чеклист",
            Quote: "Цитата",
            Code: "Код",
            Delimiter: "Разделитель",
            "Raw HTML": "HTML-фрагмент",
            Table: "Таблица",
            Link: "Ссылка",
            Marker: "Маркер",
            Bold: "Полужирный",
            Italic: "Курсив",
            InlineCode: "Моноширинный",
          },

          tools: {
            warning: {
              Title: "Название",
              Message: "Сообщение",
            },

            link: {
              "Add a link": "Вставьте ссылку",
            },

            stub: {
              "The block can not be displayed correctly.":
                "Блок не может быть отображен",
            },
          },

          blockTunes: {
            delete: {
              Delete: "Удалить",
            },
            moveUp: {
              "Move up": "Переместить вверх",
            },
            moveDown: {
              "Move down": "Переместить вниз",
            },
          },
        },
      },

      // يمكنك إضافة المزيد من الخيارات هنا
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
  }, []);

  const handleExportJson = async () => {
    try {
      const savedData = await editorInstance.current.save();
      setJsonData(savedData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        content: savedData, // تحديث القيمة content بناءً على البيانات المستقبلة من jsonData
      }));
    } catch (error) {
      console.error("Failed to export JSON:", error);
    }
  };

  return !user ? (
    router.push("/", { scroll: false })
  ) : (
    <>
      <form onSubmit={handleSubmit} className="p-4 mb-10 max-w-5xl w-full">
        <input
          type="text"
          placeholder="عنوان قصتك ,مقال"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border-none focus-within:border-none outline-none text-3xl pr-3 pl-12 py-1 font-extrabold placeholder:text-stone-400 text-right flex justify-end w-full"
          dir="auto"
        />
        <div
          id="editorjs"
          className="dark:bg-stone-800 mb-5 w-full *:dark:text-white my-4"
        ></div>
        <input
          type="text"
          placeholder="authorId"
          name="authorId"
          value={formData.authorId}
          required
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
        <div className="flex flex-row w-full gap-3">
          <div className="basis-1/2 w-full">
            <input
              type="text"
              placeholder="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
            />
            <input
              type="text"
              placeholder="tags: Example, Example, Example"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
            />
          </div>
          <div className="basis-1/2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                type="file"
                accept="image/*"
                placeholder="image"
                name="image"
                onChange={handleChange}
              />
              <div className="w-full border flex justify-center items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    formData.image ||
                    "data:image/png;base64,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"
                  }
                  alt="صورة المقال"
                  className="max-w-full"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleExportJson}
                >
                  إنشاء المقال
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
