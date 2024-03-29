import { WEBSITEAPI } from "@/app/V";
import axios from "axios";

const GetComment = async (articleId: any) => {
  try {
    const response = await axios.get(`${WEBSITEAPI}GetArticle/${articleId}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw error;
  }
};


export default GetComment;
