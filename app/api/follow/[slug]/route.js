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
        followers: true, // يتم استرجاع بيانات المتابعين للمستخدم
        following: true,
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
