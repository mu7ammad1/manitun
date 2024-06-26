"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import { toast } from "sonner";
import { WEBSITEAPI } from "@/app/V";
import { FiLoader } from "react-icons/fi";

const Toggle = ({ IdAuthor }) => {
  const [loading, setLoading] = useState(true);
  const user = useCurrentUser();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`${WEBSITEAPI}follow/${IdAuthor}`);
        const data = response.data;
        console.log(data);

        setLoading(false);

        if (data.user && data.user.following && IdAuthor) {
          setIsFollowing(
            data.user.following.some(
              (followedUser) => followedUser.followingUsername === IdAuthor
            )
          );
        }
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData();
  }, [IdAuthor]);

  const toggleFollow = async () => {
    try {
      const response = await axios.delete(`${WEBSITEAPI}follow`, {
        data: {
          followerUsername: user?.username,
          followingUsername: IdAuthor,
        },
      });

      if (response.status === 200) {
        setIsFollowing(false);

        toast("تم إلغاء المتابعة بنجاح", {
          duration: 5000,
        });
      } else {
        toast("فشلت عملية إلغاء المتابعة", {
          duration: 5000,
        });
        console.error("فشلت عملية إلغاء المتابعة");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء إلغاء المتابعة:", error);
    }
  };

  const toggleUnFollow = async () => {
    try {
      const response = await axios.post(`${WEBSITEAPI}follow`, {
        followerUsername: user?.username,
        followingUsername: IdAuthor,
      });

      if (response.status === 200) {
        setIsFollowing(true);
        toast("تم إرسال المتابعة بنجاح", {
          duration: 5000,
        });
      } else {
        console.error("فشلت عملية المتابعة");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء المتابعة:", error);
    }
  };

  return (
    <>
      {user && user.username !== IdAuthor ? (
        <>
          {loading ? (
            <span className="animate-spin">
              <FiLoader />
            </span>
          ) : (
            <>
              {isFollowing ? (
                <Button
                  variant={"ghost"}
                  className={`bg-black/0 border-none`}
                  onClick={toggleFollow}
                >
                  إلغاء المتابعة
                </Button>
              ) : (
                <Button
                  variant={"ghost"}
                  className="text-emerald-500 dark:text-emerald-800 bg-black/0 border-none"
                  onClick={toggleUnFollow}
                >
                  متابعة
                </Button>
              )}
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default Toggle;
