import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { FiLoader } from "react-icons/fi";
import { WEBSITEAPI } from "@/app/V";

export default function Likee({ articleIda }) {
  const user = useCurrentUser();
  const [liked, setLiked] = useState(false); // حالة المقال: إذا كان المستخدم قد أعجب بالمقال أم لا
  const [isLoading, setIsLoading] = useState(true); // حالة انتظار التحميل

  // تحقق من حالة الإعجاب عند تحميل المكون
  useEffect(() => {
    // تحقق مما إذا كان المستخدم قد أعجب بالمقال
    const checkLiked = async () => {
      try {
        const response = await axios.get(`${WEBSITEAPI}like/${articleIda}`);
        setLiked(response.data.likedBy);
      } catch (error) {
        console.error("فشل في جلب حالة الإعجاب بالمقال:", error);
      } finally {
        setIsLoading(false); // تحديث حالة الانتظار بعد الانتهاء من جلب البيانات
      }
    };

    checkLiked();
  }, [articleIda]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`${WEBSITEAPI}like/${articleIda}`, {
        userId: `${user?.username}`,
      });

      setLiked(true); // تعيين الإعجاب إلى true بمجرد النجاح
      toast.success(response.data.message, {
        duration: 5000,
      });
    } catch (error) {
      alert("فشل في الإعجاب بالمقال"); // عرض رسالة فشل
    }
  };
  const handleUnlike = async () => {
    try {
      const response = await axios.delete(`${WEBSITEAPI}like/${articleIda}`, {
        data: {
          userId: `${user?.username}`,
        },
      });
      setLiked(false); // تعيين الإعجاب إلى false بمجرد النجاح
      toast.success(response.data.message, {
        duration: 5000,
      });
    } catch (error) {
      alert("فشل في حذف الإعجاب بالمقال"); // عرض رسالة فشل
    }
  };

  // إذا كانت البيانات قيد التحميل، عرض رسالة انتظار
  if (isLoading) {
    return (
      <span className="animate-spin">
        <FiLoader />
      </span>
    );
  }

  return <>{user ? <Component /> : null}</>;

  function Component() {
    return (
      <>
        {liked ? (
          <Button
            variant={"outline"}
            className="shadow-none rounded-full text-4xl bg-black/0 border-none"
            onClick={handleUnlike}
          >
            <HeartFilledIcon className=" w-5 h-5 text-rose-500" />
          </Button>
        ) : (
          <div>
            <Button
              variant={"outline"}
              className="rounded-full text-4xl bg-black/0 shadow-none border-none"
              onClick={handleLike}
            >
              <HeartIcon className=" w-5 h-5 " />
            </Button>
          </div>
        )}
      </>
    );
  }
}
