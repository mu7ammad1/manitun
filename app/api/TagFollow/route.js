// url : http://localhost:3000/api/tagFollow
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // استخراج بيانات العملية من الطلب
    const { tag, userId } = await request.json();

    // التحقق مما إذا كان العنصر tag موجودًا بالفعل لنفس المستخدم
    const existingTagFollow = await db.tagFollow.findFirst({
      where: {
        tag,
        userId,
      },
    });

    // إذا كان العنصر tag موجودًا بالفعل، قم بإرجاع رسالة بالخطأ
    if (existingTagFollow) {
      return NextResponse.json(
        { message: "Tag already exists for this user" },
        { status: 400 }
      );
    }

    // إنشاء العنصر tag فقط إذا لم يكن موجودًا مسبقًا لنفس المستخدم
    const newTagFollow = await db.tagFollow.create({
      data: {
        tag,
        userId,
      },
    });

    // إرجاع رسالة تأكيد مع البيانات الجديدة
    return NextResponse.json({
      message: "New tag follow created successfully",
      data: newTagFollow,
    });
  } catch (error) {
    // إرجاع رسالة خطأ مفصلة في حالة حدوث خطأ
    return NextResponse.json(
      { message: "Failed to create new tag follow", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  try {
    // Extract follower and following usernames from the request body
    const { tag, userId } = await request.json();

    // Find and delete the follow relationship based on follower and following usernames
    const deletedFollow = await db.tagFollow.deleteMany({
      where: {
        tag,
        userId,
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
