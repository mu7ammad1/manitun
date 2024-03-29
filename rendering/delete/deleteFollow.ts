import { WEBSITEAPI } from "@/app/V";
import axios from "axios";

const DeleteFollow = async ({ userID, username }: any) => {
  try {
    const response = await axios.delete(`${WEBSITEAPI}follow`, {
      data: {
        followerUsername: userID,
        followingUsername: username,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to delete follow:", error);
    throw error;
  }
};

export default DeleteFollow;
