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
        id: true,
        author: {
          select: {
            name: true,
            username: true,
          },
        },
        title:true,
        createdAt: true,
        content: true,
        likes: true,
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
