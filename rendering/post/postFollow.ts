import { WEBSITEAPI } from "@/app/V";
import axios from "axios";

const PostFollow = async ({ userID, username }: any) => {
  try {
    const response = await axios.post(`${WEBSITEAPI}follow`, {
      followerUsername: userID,
      followingUsername: username,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw error;
  }
};

export default PostFollow;
