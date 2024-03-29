import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";
import { FaRegComments } from "react-icons/fa";

export default function SheetComments() {
  return (
    <Sheet>
      <SheetTrigger>
        <FaRegComments />
      </SheetTrigger>
      <SheetContent className="z-[99999]">
        <SheetHeader>
          <SheetTitle>التعليقات</SheetTitle>
          <SheetDescription className=" flex flex-col justify-end h-screen w-full">
            SendComment
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
// function SendComment() {
//   return (
//     <div>
//       <div className="mt-5 overflow-auto">
//         {data.article.Comments.length === 0
//           ? "لا يوجد تعليقات حتي الان"
//           : data.article.Comments.map((comment, index) => (
//               <div key={index} className="border-b border-gray-200 py-4">
//                 <div className="flex items-center justify-between w-full">
//                   <div className="flex items-center justify-end w-full gap-3">
//                     <div className="ml-4 flex items-center gap-3">
//                       <p className="text-xs font-extralight text-gray-500">
//                         {formatDistanceToNow(new Date(comment.createdAt), {
//                           addSuffix: true,
//                           locale: enUS,
//                         })}
//                       </p>
//                       <Link href={`/${comment.author.username}`}>
//                         <h3 className="text-base font-normal text-stone-900">
//                           {comment.author.name}
//                         </h3>
//                       </Link>
//                     </div>
//                     <Link href={`/${comment.author.username}`}>
//                       {/* eslint-disable-next-line @next/next/no-img-element */}
//                       <img
//                         src={comment.author.image}
//                         alt="Profile"
//                         className="w-8 h-8 rounded-full"
//                       />
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="mt-2 text-stone-950 text-right">
//                   {comment.content}
//                 </div>
//               </div>
//             ))}
//       </div>
//       <div className="flex items-center justify-end mb-16">
//         {user ? (
//           <form className="flex w-full">
//             <Textarea
//               placeholder="اكتب تعليق"
//               lang="ar"
//               name="comment"
//               className="text-right w-full"
//               value={commentContent} // Set textarea value
//               onChange={handleCommentChange} // Handle textarea change
//             />
//             <Button type="submit" onClick={(event) => SendComment(event)}>
//               إرسال
//             </Button>
//           </form>
//         ) : null}
//       </div>
//     </div>
//   );
// }
