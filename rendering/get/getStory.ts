import { WEBSITEAPI } from "@/app/V";
import axios from "axios";

const GetStory = async (slug: any) => {
  try {
    const response = await axios.get(`${WEBSITEAPI}GetArticle/${slug}`);
    console.log(response.data);

    return response.data; // إرجاع البيانات
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // رمي الخطأ للتعامل معه في النقاط الأخرى من التطبيق
  }
};

export default GetStory;
