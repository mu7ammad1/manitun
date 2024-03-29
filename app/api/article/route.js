// http://localhost:3000/api/article
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // استخراج بيانات المقال من الطلب
    const { title, image, content, authorId } = await request.json();

    // إنشاء المقال باستخدام Prisma Client
    const newExample = await db.article.create({
      data: {
        title,
        image,
        content,
        authorId,
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
    const examples = await db.article.findMany({
      include: {
        likes: true,
        author: true,
        Comments: true,
      },
    });

    // إرجاع الأمثلة في حالة نجاح
    return NextResponse.json({
      message: "Example get successfully",
      data: examples,
    });
  } catch (error) {
    // إرجاع رسالة خطأ في حالة حدوث خطأ
    return NextResponse.json(
      { message: "Failed to fetch examples", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  try {
    // استخراج معرف العنصر المراد حذفه من الطلب
    const { id } = await request.json();

    // حذف العنصر باستخدام Prisma Client
    const deletedExample = await prisma.article.delete({
      where: {
        id, // يفترض أن id هو معرف العنصر المراد حذفه
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
