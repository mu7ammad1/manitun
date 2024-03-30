// url : http://localhost:3000/api/GetTag/slug
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { slug } = params;

    // استعلام عن المقالات بناءً على الـ tag
    const articlesWithTag = await db.article.findMany({
      where: {
        tags: {
          has: slug, // ابحث عن المقالات التي تحتوي على الـ tag المحدد
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        tags: true,
        draft: true,
        createdAt: true,
        image: true,
        author: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });

    // إرجاع المقالات المرتبطة بالـ tag
    return NextResponse.json({
      message: "Articles with tag retrieved successfully",
      data: articlesWithTag,
    });
  } catch (error) {
    // إرجاع رسالة خطأ في حالة حدوث خطأ
    return NextResponse.json(
      { message: "Error fetching articles with tag", error },
      { status: 500 }
    );
  }
};
