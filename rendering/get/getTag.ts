import { WEBSITEAPI } from "@/app/V";
import axios from "axios";

const GetTag = async (params: any) => {
  try {
    const response = await axios.get(`${WEBSITEAPI}GetTag/${params.slug}`);
    console.log(response.data);

    return response.data; // إرجاع البيانات
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // رمي الخطأ للتعامل معه في النقاط الأخرى من التطبيق
  }
};

export default GetTag;