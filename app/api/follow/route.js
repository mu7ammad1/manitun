// url : http://localhost:3000/api/follow
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // استخراج بيانات المقال من الطلب
    const { followerUsername, followingUsername } = await request.json();

    // إنشاء المقال باستخدام Prisma Client
    const newExample = await db.follow.create({
      data: {
        followerUsername,
        followingUsername,
      },
    });

    // إرجاع رسالة تأكيد مع البيانات الجديدة
    return NextResponse.json({
      message: "New example created successfully",
      data: newExample,
    });
  } catch (error) {
    // إرجاع رسالة خطأ مفصلة في حالة حدوث خطأ
    return NextResponse.json(
      { message: "Failed to create new example", error },
      { status: 500 }
    );
  }
};


export const DELETE = async (request) => {
  try {
    // Extract follower and following usernames from the request body
    const { followerUsername, followingUsername } = await request.json();

    // Find and delete the follow relationship based on follower and following usernames
    const deletedFollow = await db.follow.deleteMany({
      where: {
        followerUsername,
        followingUsername,
      },
    });

    // Check if any follow relationship was deleted
    if (deletedFollow.count === 0) {
      // If no follow relationship was deleted, return a not found response
      return NextResponse.json(
        { message: "Follow relationship not found" },
        { status: 404 }
      );
    }

    // Return a success message if the follow relationship was deleted successfully
    return NextResponse.json({
      message: "Follow relationship deleted successfully",
    });
  } catch (error) {
    // Return an error response if an error occurs during the process
    return NextResponse.json(
      { message: "Failed to delete follow relationship", error },
      { status: 500 }
    );
  }
};
