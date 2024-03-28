// http://localhost:3000/api/article
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export const GET = async (): Promise<any> => {
  try {
    // استعلام عن جميع المقالات وجلب العناصر المحددة فقط
    const articles: Article[] = await db.article.findMany({
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

    // إرجاع البيانات في حالة نجاح
    return NextResponse.json({
      message: "Articles retrieved successfully",
      data: articles,
    });
  } catch (error) {
    // إرجاع رسالة خطأ في حالة حدوث خطأ
    return NextResponse.json(
      { message: "Failed to fetch articles", error },
      { status: 500 }
    );
  }
};

interface Article {
  id: string;
  title: string;
  description: string;
  image: string | null;
  createdAt: Date;
  draft: boolean;
  tags: string[];
  author: { username: string; image: string | null };
}
