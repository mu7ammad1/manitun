// url : http://localhost:3000/api/articale/slug
import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export const POST = async (request, { params }) => {
  try {
    const { slug } = params;
    const data = await request.json();

    // افحص ما إذا كانت المقالة موجودة
    const article = await db.article.findUnique({
      where: {
        id: slug,
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "المقال غير موجود" },
        { status: 404 }
      );
    }

    // قم بإنشاء إعجاب جديد
    const createdLike = await db.like.create({
      data: {
        user: { connect: { username: data.userId } }, // اربط الإعجاب بالمستخدم
        articles: { connect: { id: slug } }, // اربط الإعجاب بالمقال
      },
    });

    return NextResponse.json({
      message: "تم الإعجاب بنجاح",
      like: createdLike,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "فشل في الإعجاب", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { slug } = params;
    const data = await request.json();

    // احذف الإعجاب إذا كان موجودًا
    await db.like.delete({
      where: {
        articleId_userId: {
          articleId: slug,
          userId: data.userId,
        },
      },
    });

    return NextResponse.json({ message: "تم إلغاء الإعجاب بنجاح" });
  } catch (error) {
    return NextResponse.json(
      { message: "فشل في إلغاء الإعجاب", error },
      { status: 500 }
    );
  }
};
