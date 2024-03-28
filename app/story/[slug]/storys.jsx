"use client";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import LinkJS from "@editorjs/link";
import Image from "@editorjs/image";
import Embed from "@editorjs/embed";
import Delimiter from "@editorjs/delimiter";
import Code from "@editorjs/code";
import Checklist from "@editorjs/checklist";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Skeleton_story from "@/components/Skeleton/Skeleton.story";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { enUS } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CiBookmarkPlus, CiShare1, CiShare2 } from "react-icons/ci";
import { FaRegComments } from "react-icons/fa6";
import {
  FaCopy,
  FaFacebook,
  FaHeart,
  FaTwitch,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

import { WEBSITE } from "@/app/V";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";

// دالة لاستدعاء تحديث التعليقات من الخادم
async function fetchComments(params) {
  try {
    const response = await axios.get(`${WEBSITE}/api/article/${params}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export default function Storys({ params }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState(""); // State for textarea value
  const [isFollowing, setIsFollowing] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const editorInstance = useRef(null);

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



  const user = useCurrentUser();
  const [content, setContent] = useState();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    editorInstance.current = new EditorJS({
      holder: "EditorJS",
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "عنوان",
          },
          shortcut: "CMD+SHIFT+H",
        },
        image: {
          class: Image,
          inlineToolbar: true,
          config: {
            placeholder: "صورة",
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        list: {
          class: List,
          inlineToolbar: true,
          toolbox: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
      autofocus: true,
      onReady: () => {
        console.log("Editor.js is ready to work!");
      },
      placeholder: "!دعونا نكتب قصة رهيبة",

      data: {
        time: 1711616047775,
        blocks: [
          {
            id: "GuaJssLT-w",
            type: "header",
            data: {
              text: "Unhandled Runtime Error",
              level: 1,
            },
          },
          {
            id: "-vIC9WMQwm",
            type: "paragraph",
            data: {
              text: "Error: Objects are not valid as a React child (found: object with keys {slug}). If you meant to render a collection of children, use an array instead.",
            },
          },
          {
            id: "rpxZ01N3T3",
            type: "header",
            data: {
              text: "Call Stack",
              level: 2,
            },
          },
          {
            id: "NmeH4mZhr6",
            type: "header",
            data: {
              text: "throwOnInvalidObjectType",
              level: 3,
            },
          },
          {
            id: "5sdi_GEFgS",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (8872:0)",
            },
          },
          {
            id: "J-rofgPkbw",
            type: "header",
            data: {
              text: "reconcileChildFibersImpl",
              level: 3,
            },
          },
          {
            id: "aCzNiSXuD0",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (9879:0)",
            },
          },
          {
            id: "RgXYYVxpGV",
            type: "header",
            data: {
              text: "reconcileChildFibers",
              level: 3,
            },
          },
          {
            id: "JcJ6KEozHn",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (9900:0)",
            },
          },
          {
            id: "i_5Xm2orkR",
            type: "header",
            data: {
              text: "reconcileChildren",
              level: 3,
            },
          },
          {
            id: "NuqEu1bfDU",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (15606:0)",
            },
          },
          {
            id: "l7tDAVkM1L",
            type: "header",
            data: {
              text: "updateHostComponent$1",
              level: 3,
            },
          },
          {
            id: "8M763HuLAQ",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (16568:0)",
            },
          },
          {
            id: "GBrfTtDI_i",
            type: "header",
            data: {
              text: "beginWork$1",
              level: 3,
            },
          },
          {
            id: "lkBfqN6rpA",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (18390:0)",
            },
          },
          {
            id: "sPM5dNvOKS",
            type: "header",
            data: {
              text: "beginWork",
              level: 3,
            },
          },
          {
            id: "A9JMoMWucf",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (26741:0)",
            },
          },
          {
            id: "TLXlMCDaa2",
            type: "header",
            data: {
              text: "performUnitOfWork",
              level: 3,
            },
          },
          {
            id: "XNOwNK_auT",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (25587:0)",
            },
          },
          {
            id: "6x53RzLYPS",
            type: "header",
            data: {
              text: "workLoopSync",
              level: 3,
            },
          },
          {
            id: "GilOVNUWiJ",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (25303:0)",
            },
          },
          {
            id: "3nkzFx00dH",
            type: "header",
            data: {
              text: "renderRootSync",
              level: 3,
            },
          },
          {
            id: "-g-5ZaqMi7",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (25258:0)",
            },
          },
          {
            id: "OJMe-qa9ty",
            type: "header",
            data: {
              text: "recoverFromConcurrentError",
              level: 3,
            },
          },
          {
            id: "LNFek_iogc",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (24475:0)",
            },
          },
          {
            id: "6pzh8aFIf7",
            type: "header",
            data: {
              text: "performConcurrentWorkOnRoot",
              level: 3,
            },
          },
          {
            id: "ZLcKxBSBeX",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (24420:0)",
            },
          },
          {
            id: "8vdTFLEkK5",
            type: "header",
            data: {
              text: "workLoop",
              level: 3,
            },
          },
          {
            id: "mcmGyRfBIU",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\scheduler\\cjs\\scheduler.development.js (261:0)",
            },
          },
          {
            id: "O3BcY1IwI8",
            type: "header",
            data: {
              text: "flushWork",
              level: 3,
            },
          },
          {
            id: "4LxKoVrHOB",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\scheduler\\cjs\\scheduler.development.js (230:0)",
            },
          },
          {
            id: "Ce32PpkCO9",
            type: "header",
            data: {
              text: "MessagePort.performWorkUntilDeadline",
              level: 3,
            },
          },
          {
            id: "CDQwlOiowd",
            type: "header",
            data: {
              text: "Unhandled Runtime Error",
              level: 1,
            },
          },
          {
            id: "BuYnqc2KIt",
            type: "paragraph",
            data: {
              text: "Error: Objects are not valid as a React child (found: object with keys {slug}). If you meant to render a collection of children, use an array instead.",
            },
          },
          {
            id: "X2XNKHQGJ_",
            type: "header",
            data: {
              text: "Call Stack",
              level: 2,
            },
          },
          {
            id: "ip3I2lj_3L",
            type: "header",
            data: {
              text: "throwOnInvalidObjectType",
              level: 3,
            },
          },
          {
            id: "lX7Gk5p_HB",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (8872:0)",
            },
          },
          {
            id: "nHp_3PGIKT",
            type: "header",
            data: {
              text: "reconcileChildFibersImpl",
              level: 3,
            },
          },
          {
            id: "qfRWCmf-qd",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (9879:0)",
            },
          },
          {
            id: "Vi_mjk6wsu",
            type: "header",
            data: {
              text: "reconcileChildFibers",
              level: 3,
            },
          },
          {
            id: "CjFJY9WvtE",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (9900:0)",
            },
          },
          {
            id: "OmIlYRmQYG",
            type: "header",
            data: {
              text: "reconcileChildren",
              level: 3,
            },
          },
          {
            id: "kHbetImEdu",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (15606:0)",
            },
          },
          {
            id: "l9teCAUFNp",
            type: "header",
            data: {
              text: "updateHostComponent$1",
              level: 3,
            },
          },
          {
            id: "bZcFcOl2Qy",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (16568:0)",
            },
          },
          {
            id: "nXPMV5pFcR",
            type: "header",
            data: {
              text: "beginWork$1",
              level: 3,
            },
          },
          {
            id: "_jqXxB6lHV",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (18390:0)",
            },
          },
          {
            id: "PNyKdtmL4J",
            type: "header",
            data: {
              text: "beginWork",
              level: 3,
            },
          },
          {
            id: "6M1TWEhD37",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (26741:0)",
            },
          },
          {
            id: "dhFf5CKQaK",
            type: "header",
            data: {
              text: "performUnitOfWork",
              level: 3,
            },
          },
          {
            id: "pSndPdwFkR",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (25587:0)",
            },
          },
          {
            id: "CVF9yaSrXb",
            type: "header",
            data: {
              text: "workLoopSync",
              level: 3,
            },
          },
          {
            id: "cDpn8snseH",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (25303:0)",
            },
          },
          {
            id: "2aC34Y9gRf",
            type: "header",
            data: {
              text: "renderRootSync",
              level: 3,
            },
          },
          {
            id: "Gx9_SjwKH9",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (25258:0)",
            },
          },
          {
            id: "RR7BPDm4UC",
            type: "header",
            data: {
              text: "recoverFromConcurrentError",
              level: 3,
            },
          },
          {
            id: "Xbuu3ZjWLf",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (24475:0)",
            },
          },
          {
            id: "2Y-IwRciK5",
            type: "header",
            data: {
              text: "performConcurrentWorkOnRoot",
              level: 3,
            },
          },
          {
            id: "DBy-3CSTL3",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\react-dom\\cjs\\react-dom.development.js (24420:0)",
            },
          },
          {
            id: "hb3YEhzFV9",
            type: "header",
            data: {
              text: "workLoop",
              level: 3,
            },
          },
          {
            id: "VlCaF66Ed_",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\scheduler\\cjs\\scheduler.development.js (261:0)",
            },
          },
          {
            id: "75dqPFCgW6",
            type: "header",
            data: {
              text: "flushWork",
              level: 3,
            },
          },
          {
            id: "owgEI-zLk4",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\scheduler\\cjs\\scheduler.development.js (230:0)",
            },
          },
          {
            id: "h0kGnZ8sy8",
            type: "header",
            data: {
              text: "MessagePort.performWorkUntilDeadline",
              level: 3,
            },
          },
          {
            id: "UG-CeDPvyL",
            type: "paragraph",
            data: {
              text: "node_modules\\next\\dist\\compiled\\scheduler\\cjs\\scheduler.development.js (534:0)",
            },
          },
        ],
        version: "2.29.1",
      },

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
            Text: "نصوص",
            Heading: "عنوان",
            List: "قوائم",
            Warning: "Примечание",
            Checklist: "Чеклист",
            Quote: "اقتباس",
            Code: "برمجة",
            Delimiter: "Разделитель",
            "Raw HTML": "HTML-фрагмент",
            Table: "Таблица",
            Link: "رابط",
            Marker: "Маркер",
            Bold: "خط س",
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
              Delete: "حذف",
            },
            moveUp: {
              "Move up": "الي اعلي",
            },
            moveDown: {
              "Move down": "الي اسفل",
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

  

  useEffect(() => {
    const fetchAndUpdateComments = async () => {
      const commentsData = await fetchComments(params);
      setComments(commentsData);
    };

    fetchAndUpdateComments();
  }, [params]);

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const SendComment = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${WEBSITE}/api/article/${data.article.id}`,
        {
          authorUsername: user?.username,
          content: commentContent,
        }
      );
      if (response.status === 200) {
        console.log("Comment sent successfully:", response.data);
        setCommentContent("");
        // Fetch updated comments from the server
        const updatedCommentsResponse = await axios.get(
          `${WEBSITE}/api/article/${params}`
        );
        const updatedComments = updatedCommentsResponse.data.article.Comments;
        // Update the comments state with the new data
        setData((prevData) => ({
          ...prevData,
          article: {
            ...prevData.article,
            Comments: updatedComments,
          },
        }));
      } else {
        console.error("Error sending comment. Status:", response.status);
      }
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const followUser = async () => {
    try {
      const response = await axios.post(
        `${WEBSITE}/api/follow/${params.slug}}`,
        {
          followerUsername: user?.username,
          followingUsername: data?.user?.username,
        }
      );

      if (response.status === 200) {
        setIsFollowing(true);
        setData((prevUserData) => ({
          ...prevUserData,
          user: {
            ...prevUserData.user,
            following: [
              ...prevUserData.user.following,
              { followerUsername: user?.username },
            ],
          },
        }));
        toast("تم إرسال المتابعة بنجاح", {
          description: Date(),
          duration: 5000,
        });
      } else {
        console.error("Failed to follow user");
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unfollowUser = async () => {
    try {
      if (
        !data ||
        !data.user ||
        !data.user.following ||
        data.user.following.length === 0
      ) {
        console.error("User data or following list is not available");
        return;
      }

      const response = await axios.delete(`${WEBSITE}/api/follow`, {
        data: {
          followingUsername: data.user.username,
          followerUsername: user?.username,
        },
      });

      if (response.status === 200) {
        setIsFollowing(false);
        setData((prevUserData) => ({
          ...prevUserData,
          user: {
            ...prevUserData.user,
            following: prevUserData.user.following.filter(
              (follower) => follower.followerUsername !== user?.username
            ),
          },
        }));
        toast("تم إلغاء المتابعة بنجاح", {
          description: Date(),
          duration: 5000,
        });
      } else {
        toast("Failed to unfollow user", {
          description: Date(),
          duration: 5000,
        });
        console.error("Failed to unfollow user");
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  if (loading) {
    return <Skeleton_story />;
  }

  if (!data) {
    return <div>Story not found</div>;
  }

  const SheetComments = (
    <Sheet>
      <SheetTrigger>
        <FaRegComments />
      </SheetTrigger>
      <SheetContent className="z-[99999]">
        <SheetHeader>
          <SheetTitle>التعليقات</SheetTitle>
          <SheetDescription className=" flex flex-col justify-end h-screen w-full">
            <div className="mt-5 overflow-auto">
              {data.article.Comments.length === 0
                ? "لا يوجد تعليقات حتي الان"
                : data.article.Comments.map((comment, index) => (
                    <div key={index} className="border-b border-gray-200 py-4">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-end w-full gap-3">
                          <div className="ml-4 flex items-center gap-3">
                            <p className="text-xs font-extralight text-gray-500">
                              {formatDistanceToNow(
                                new Date(comment.createdAt),
                                {
                                  addSuffix: true,
                                  locale: enUS,
                                }
                              )}
                            </p>
                            <Link href={`/${comment.author.username}`}>
                              <h3 className="text-base font-normal text-stone-900">
                                {comment.author.name}
                              </h3>
                            </Link>
                          </div>
                          <Link href={`/${comment.author.username}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={comment.author.image}
                              alt="Profile"
                              className="w-8 h-8 rounded-full"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="mt-2 text-stone-950 text-right">
                        {comment.content}
                      </div>
                    </div>
                  ))}
            </div>
            <div className="flex items-center justify-end mb-16">
              {user ? (
                <form className="flex w-full">
                  <Textarea
                    placeholder="اكتب تعليق"
                    lang="ar"
                    name="comment"
                    className="text-right w-full"
                    value={commentContent} // Set textarea value
                    onChange={handleCommentChange} // Handle textarea change
                  />
                  <Button type="submit" onClick={(event) => SendComment(event)}>
                    إرسال
                  </Button>
                </form>
              ) : null}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
  const ShareBTN = (
    <Dialog>
      <DialogTrigger>
        <CiShare2 />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اختار طريقة المشاركة</DialogTitle>
          <DialogDescription className="grid grid-cols-3 max-md:grid-cols-2 mt-3">
            <Button
              className="p-3 bg-stone-50/0 shadow-none text-stone-900 flex justify-center items-center gap-3 hover:text-white"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast("تم نسخ الرابط بنجاح");
              }}
            >
              <FaCopy />
              <span>Copy</span>
            </Button>
            <Button
              className="p-3 bg-stone-50/0 shadow-none text-stone-900 flex justify-center items-center gap-3 hover:text-white"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/sharer/sharer.php?u=" +
                    encodeURIComponent(window.location.href)
                )
              }
            >
              <FaFacebook />
              <span>FaceBook</span>
            </Button>
            <Button
              className="p-3 bg-stone-50/0 shadow-none text-stone-900 flex justify-center items-center gap-3 hover:text-white"
              onClick={() =>
                window.open(
                  "https://twitter.com/intent/tweet?url=" +
                    encodeURIComponent(window.location.href)
                )
              }
            >
              <FaTwitter />
              <span>Twitter</span>
            </Button>
            <Button
              className="p-3 bg-stone-50/0 shadow-none text-stone-900 flex justify-center items-center gap-3 hover:text-white"
              onClick={() => window.open("https://www.twitch.tv/your_channel")}
            >
              <FaTwitch />
              <span>Twitch</span>
            </Button>
            <Button
              className="p-3 bg-stone-50/0 shadow-none text-stone-900 flex justify-center items-center gap-3 hover:text-white"
              onClick={() =>
                window.open(
                  "whatsapp://send?text=" +
                    encodeURIComponent(window.location.href)
                )
              }
            >
              <FaWhatsapp />
              <span>Whatsapp</span>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
  const SeeMore = (
    <Carousel className="mb-20">
      <CarouselContent className=" gap-3 flex">
        {data.userArticles.map((article, index) => (
          <CarouselItem key={index} className="basis-1/2 ">
            <Link href={`/story/${article.id}`}>
              <div className="py-2 px-2 my-5 group ease-out w-full duration-300 *:text-right hover:bg-stone-100 rounded-lg">
                <div>
                  {article.image ? (
                    <Link href={`/${article.id}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.image}
                        alt={"manitun.com - asf"}
                        className="w-full h-[164px] max-sm:h-80 max-md:h-80 p-2 object-cover object-center rounded-xl group-hover:scale-105 scale-100 group-hover:ease-in duration-300"
                      />
                    </Link>
                  ) : null}
                </div>
                <div className="pt-2 pb-4 grid gap-2">
                  <p className="text-xs">
                    {formatDistanceToNow(new Date(article.createdAt), {
                      addSuffix: true,
                      locale: enUS,
                    })}
                  </p>

                  <h1 className={cn("text-xl font-medium  line-clamp-2")}>
                    <Link href={`/story/${article.id}`}>{article.title}</Link>
                  </h1>
                  <p
                    className={cn(
                      "text-xs font-extralight italic  text-right pl-2 line-clamp-4"
                    )}
                  >
                    {article.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    {article.tags[1] ? (
                      <span className="bg-[#D9D9D940] py-1 px-3 rounded-full text-xs">
                        <Link href={"/tag/" + article.tags[0]}>
                          {article.tags[0] ? article.tags[0] : null}
                        </Link>
                      </span>
                    ) : null}
                    {article.tags[1] ? (
                      <span className="bg-[#D9D9D940] py-1 px-3 rounded-full text-xs">
                        <Link href={"/tag/" + article.tags[1]}>
                          {article.tags[1] ? article.tags[1] : null}
                        </Link>
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );

  const Toople = (
    <div className="fixed bottom-5 left-1/2 right-1/2 flex justify-center">
      <div className="flex justify-end items-center bg-white/40 backdrop-blur-md px-2 gap-x-4 py-1 rounded-full">
        <Button
          variant={"default"}
          className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
        >
          <FaHeart />
        </Button>
        <Button
          variant={"default"}
          className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
        >
          <CiBookmarkPlus />
        </Button>
        <Button
          variant={"default"}
          className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-700 text-xl px-2 rounded-full"
        >
          {SheetComments}
        </Button>
      </div>
    </div>
  );

  console.log(content);

  return (
    <main className="flex justify-center">
      <section className={cn("max-w-3xl w-full mt-10")}>
        <h1
          className="text-4xl font-semibold text-right mb-5"
        >
          {data.article.title ? data.article.title : "لا يوجد عنوان هنا للاسف "}
        </h1>

        <div
          id="EditorJS"
          className="dark:bg-stone-800 mb-5 w-full *:dark:text-white"
        >
          {/* عرض المحتوى هنا */}
          {/* {data.article.content} */}
        </div>

        <div className="mb-5">
          <div className="flex justify-between items-center">
            <div className="flex justify-end items-center gap-3 ">
              <Button
                variant={"default"}
                className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
              >
                {ShareBTN}
              </Button>
              <Button
                variant={"default"}
                className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
              >
                <FaHeart />
              </Button>
              <Button
                variant={"default"}
                className="bg-stone-50/0 hover:bg-[#d4a373] hover:text-white shadow-none text-stone-900 text-xl px-2 rounded-full"
              >
                {SheetComments}
              </Button>
            </div>
            <div className="flex justify-end items-center gap-3 ">
              <div>
                <h6 className="text-base font-light hover:underline">
                  <Link href={`/${data.article.author.username}`}>
                    {data.article.author.name}
                  </Link>
                </h6>
                <div className="flex justify-end items-center gap-3">
                  <button className="text-sm font-thin hover:text-emerald-500 flex hover:underline underline-offset-8 decoration-emerald-500">
                    متابعة
                  </button>
                  <h6 className="text-sm font-extralight">
                    {formatDistanceToNow(new Date(data.article.createdAt), {
                      addSuffix: true,
                      locale: enUS,
                    })}
                  </h6>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.article.author.image}
                alt="img profile"
                className="w-11 h-11 rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-stone-100 p-5 rounded-lg">
          <div>
            <div>
              <Link href={`/${data.article.author.username}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.article.author.image}
                  alt=""
                  className="w-24 h-24 rounded-full object-cover object-center"
                />
              </Link>
              <h1 className="text-2xl font-normal my-3">
                <Link href={`/${data.article.author.username}`}>
                  {data.article.author.username}
                </Link>
              </h1>
              {isFollowing !== true ? (
                <Button
                  className={`bg-emerald-500 w-52 rounded-full hover:bg-stone-800 max-lg:w-52`}
                  onClick={followUser}
                >
                  {isFollowing ? "unfollow" : "متابعة"}
                </Button>
              ) : (
                <Button
                  className={`bg-emerald-500 w-52 rounded-full hover:bg-stone-800 max-lg:w-52`}
                  onClick={unfollowUser}
                >
                  {isFollowing ? "unfollow" : "متابعة"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <h1 className="text-right text-2xl mt-4">مزيد من القصص 🔥</h1>
        {SeeMore}

        {Toople}
      </section>
    </main>
  );
}
