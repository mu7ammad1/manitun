// url : http://localhost:3000/api/follow/slug
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { slug } = params;
    // استرداد المستخدم المعين
    const user = await db.user.findUnique({
      where: {
        username: slug,
      },
      select: {
        followers: {
          select: {
            followerUsername: true,
          },
        }, // يتم استرجاع بيانات المتابعين للمستخدم
        following: {
          select: {
            followingUsername: true,
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting user articles", error },
      { status: 500 }
    );
  }
};

// export const GET = async (request, { params }) => {
//   try {
//     const { slug } = params;

//     const like = await db.like.findFirst({
//       where: {
//         articleId: slug,
//       },
//       select: {
//         user: {
//           select: {
//             username: true,
//           },
//         }, // يتم تضمين بيانات المستخدم المعجب
//       },
//     });

//     if (!like) {
//       return NextResponse.json({
//         message: "لا يوجد إعجاب بالمقال",
//       });
//     }

//     return NextResponse.json({
//       message: "تم العثور على إعجاب بالمقال",
//       likedBy: like, // بيانات المستخدم الذي قام بالإعجاب
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "فشل في استعلام المستخدم الذي قام بالإعجاب بالمقال", error },
//       { status: 500 }
//     );
//   }
// };
