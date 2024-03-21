// url : http://localhost:3000/api/articale/slug
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { slug } = params;

    // استعلام عن المقال الحالي بناءً على الـ slug
    const articleWithUser = await db.article.findUnique({
      where: {
        id: slug,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            username: true,
          },
        },
      },
    });

    // التحقق مما إذا كان المقال موجودًا
    if (!articleWithUser) {
      return NextResponse.json(
        { message: "Article NOT FOUND" },
        { status: 404 }
      );
    }

    // استعلام عن جميع المقالات التي كتبها المستخدم
    const userArticles = await db.article.findMany({
      where: {
        authorId: articleWithUser.authorId,
        NOT: { id: articleWithUser.id }, // استثناء المقال الحالي
      },
      take: 5, // قم بتحديد عدد الأخيرة المقالات التي تريد عرضها
      orderBy: {
        createdAt: "desc", // ترتيب المقالات بتاريخ الإنشاء بالتنازلي
      },
    });

    // إرجاع المقال الحالي مع بيانات المستخدم وصورته وأيضًا جميع المقالات التي كتبها المستخدم
    return NextResponse.json({
      article: articleWithUser,
      userArticles: userArticles,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching article", error },
      { status: 500 }
    );
  }
};




export const DELETE = async (request, { params }) => {
  try {
    const { slug } = params;

    // قم بتحديد معرف المقال باستخدام slug أو أي معرف آخر متاح
    const article = await db.article.findUnique({
      where: {
        id: slug,
      },
    });

    // التحقق مما إذا كان المقال موجودًا
    if (!article) {
      return NextResponse.json(
        { message: "Article NOT FOUND" },
        { status: 404 }
      );
    }

    // حذف المقال باستخدام Prisma Client
    await db.article.delete({
      where: {
        id: slug,
      },
    });

    // إرجاع رسالة تأكيد بنجاح الحذف
    return NextResponse.json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    // إرجاع رسالة خطأ في حالة حدوث خطأ
    return NextResponse.json(
      { message: "Failed to delete article", error },
      { status: 500 }
    );
  }
};




export const PUT = async (request, { params }) => {
  try {
    const { slug } = params;
    const data = await request.json();

    // تحديث المقال باستخدام Prisma Client
    const updatedArticle = await db.article.update({
      where: {
        id: slug, // يتم استخدام slug كمعرف للمقال
      },
      data: {
        title: data.title,
        content: data.content,
        updatedAt: new Date(),
        description: data.description,
        image: data.image,
        tags: data.tags,
        draft: data.draft,
      },
    });

    // إرجاع رسالة تأكيد مع البيانات المحدثة
    return NextResponse.json({
      message: "Article updated successfully",
      data: updatedArticle,
    });
  } catch (error) {
    // إرجاع رسالة خطأ مفصلة في حالة حدوث خطأ
    return NextResponse.json(
      { message: "Failed to update article", error },
      { status: 500 }
    );
  }
};