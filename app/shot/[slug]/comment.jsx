import GetComment from "@/rendering/get/getComment";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaRegComments } from "react-icons/fa";
export default function Comment({ articleId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await GetComment(articleId);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger onClick={fetchComments}>
        <FaRegComments />
      </SheetTrigger>
      <SheetContent className="z-[99999]">
        <SheetHeader>
          <SheetTitle>التعليقات</SheetTitle>
          <SheetDescription>
            {loading && <div>Loading...</div>}
            {!loading && (
              <>
                {Array.isArray(comments) && comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id}>
                      <div>{comment.id}</div>
                    </div>
                  ))
                ) : (
                  <div>No comments available</div>
                )}
              </>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
