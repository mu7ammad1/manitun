// url : http://localhost:3000/api/posts/slug
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    // User Unique
    const user = await db.article.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "user NOT FOUND", error },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "user GET Error", error },
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
