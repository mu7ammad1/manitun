import { WEBSITEAPI } from "@/app/V";
import axios from "axios";

const GetArticle = async (limit = 2) => {
  try {
    const response = await axios.get(`${WEBSITEAPI}GetArticle`, {
      params: {
        limit: limit, // تحديد عدد العناصر المراد جلبها
      },
    });
    console.log(response.data.data);

    return response.data.data; // إرجاع البيانات
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // رمي الخطأ للتعامل معه في النقاط الأخرى من التطبيق
  }
};

export default GetArticle;