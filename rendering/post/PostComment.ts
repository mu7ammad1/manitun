import { WEBSITEAPI } from "@/app/V";
import axios from "axios";

export const handleSubmit = async ({
  articleId,
  content,
  authorUsername,
  setSending,
  setContent,
  setAuthorUsername,
  fetchComments,
}: any) => {
  try {
    setSending(true);
    await axios.post(`${WEBSITEAPI}/GetComment/${articleId}`, {
      content,
      authorUsername,
    });
    setContent("");
    setAuthorUsername();
    fetchComments();
    alert("تم ارسال التعليق بنجاح!");
  } catch (error) {
    console.error("حدث خطأ أثناء إرسال التعليق:", error);
    alert("حدث خطأ أثناء إرسال التعليق!");
  } finally {
    setSending(false);
  }
};
