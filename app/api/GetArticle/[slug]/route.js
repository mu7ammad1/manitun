// url : http://localhost:3000/api/GetArticle/slug
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { slug } = params;

    // استعلام عن المقال بناءً على الـ slug
    const article = await db.article.findUnique({
      where: {
        id: slug,
      },
      select: {
        Comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    // التحقق مما إذا كان المقال موجودًا
    if (!article) {
      return NextResponse.json(
        { message: "Article NOT FOUND" },
        { status: 404 }
      );
    }

    // إرجاع التعليقات المرتبطة بالمقال
    return NextResponse.json({
      articleId: article.id,
      comments: article.Comments,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching article and comments", error },
      { status: 500 }
    );
  }
};
