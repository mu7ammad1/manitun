// url : http://localhost:3000/api/GetComment/[getcomment]
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { getcomment } = params;

    const article = await db.article.findUnique({
      where: {
        id: getcomment,
      },
      select: {
        Comments: {
          select: {
            createdAt: true,
            content: true,
            author: {
              select: {
                name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article NOT FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: article,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching article and comments", error },
      { status: 500 }
    );
  }
};

export const POST = async (request, { params }) => {
  try {
    const { getcomment } = params;
    const data = await request.json();

    const article = await db.article.findUnique({
      where: {
        id: getcomment,
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "المقال غير موجود" },
        { status: 404 }
      );
    }

    // إنشاء التعليق
    const createdComment = await db.comments.create({
      data: {
        content: data.content,
        author: { connect: { username: data.authorUsername } }, // ربط التعليق بالمؤلف
        articles: { connect: { id: getcomment } }, // ربط التعليق بالمقال
      },
    });

    return NextResponse.json({
      message: "تم إنشاء التعليق بنجاح",
      comment: createdComment,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "فشل في إنشاء التعليق", error },
      { status: 500 }
    );
  }
};
