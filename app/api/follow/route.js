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

export const GET = async () => {
  try {
    // استعلام عن جميع الأمثلة
    const examples = await db.user.findMany();

    // استعلام عن جميع المتابعين لحساب معين
    const followers = await db.follow.findMany({
      where: {
        followerUsername: "twassul", // استبدل EXAMPLE_USERNAME بمتغير يحتوي على اسم المستخدم للحساب المعين
      },
    });

    // إرجاع الأمثلة وجميع المتابعين لحساب معين في حالة نجاح
    return NextResponse.json({ examples, followers });
  } catch (error) {
    // إرجاع رسالة خطأ في حالة حدوث خطأ
    return NextResponse.json(
      { message: "Failed to fetch examples and followers", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  try {
    // استخراج معرف العنصر المراد حذفه من الطلب
    const { followingUsername,followerUsername } = await request.json();

    // حذف العنصر باستخدام Prisma Client
    const deletedExample = await prisma.follow.delete({
      where: {
        followerUsername,
        followingUsername
      },
    });

    // إرجاع رسالة تأكيد مع البيانات المحذوفة
    return NextResponse.json({
      message: "Example deleted successfully",
      data: deletedExample,
    });
  } catch (error) {
    // إرجاع رسالة خطأ مفصلة في حالة حدوث خطأ
    return NextResponse.json(
      { message: "Failed to delete example", error },
      { status: 500 }
    );
  }
};
