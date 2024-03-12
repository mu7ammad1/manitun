// url : http://localhost:3000/api/posts/slug
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    // استرداد المستخدم المعين
    const user = await db.user.findUnique({
      where: {
        username: id,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // استرداد المقالات التي يكون المستخدم المعين هو الكاتب لها
    const articles = await db.article.findMany({
      where: {
        authorId: user.username,
      },
    });

    return NextResponse.json({ user, articles });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting user articles", error },
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
        title: id, // يفترض أن id هو معرف العنصر المراد حذفه
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
