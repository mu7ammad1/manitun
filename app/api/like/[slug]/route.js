// url : http://localhost:3000/api/like/[slug]
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export const POST = async (request, { params }) => {
  try {
    const { slug } = params;
    const data = await request.json();

    if (!data.userId) {
      throw new Error("يجب توفير معرّف المستخدم");
    }

    const existingLike = await db.like.findFirst({
      where: {
        userId: data.userId,
        articleId: slug, // استخدام قيمة slug كمعرّف للمقال
      },
    });

    if (existingLike) {
      return NextResponse.json({
        message: "لقد قمت بالفعل بالإعجاب بهذا المقال",
      });
    }

    await db.like.create({
      data: {
        userId: data.userId,
        articleId: slug, // استخدام قيمة slug كمعرّف للمقال
      },
    });

    return NextResponse.json({ message: "تم الإعجاب بالمقال بنجاح" });
  } catch (error) {
    return NextResponse.json(
      { message: "فشل في الإعجاب بالمقال", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { slug } = params;
    const data = await request.json();

    if (!data.userId) {
      throw new Error("يجب توفير معرّف المستخدم");
    }

    const existingLike = await db.like.findFirst({
      where: {
        userId: data.userId,
        articleId: slug, // استخدام قيمة slug كمعرّف للمقال
      },
    });

    if (!existingLike) {
      return NextResponse.json({
        message: "لا يوجد إعجاب بالمقال",
      });
    }

    await db.like.deleteMany({
      where: {
        userId: data.userId,
        articleId: slug, // استخدام قيمة slug كمعرّف للمقال
      },
    });

    return NextResponse.json({
      message: "تم حذف الإعجاب بالمقال بنجاح",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "فشل في حذف الإعجاب بالمقال", error },
      { status: 500 }
    );
  }
};

export const GET = async (request, { params }) => {
  try {
    const { slug } = params;

    const like = await db.like.findFirst({
      where: {
        articleId: slug,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        }, // يتم تضمين بيانات المستخدم المعجب
      },
    });

    if (!like) {
      return NextResponse.json({
        message: "لا يوجد إعجاب بالمقال",
      });
    }

    return NextResponse.json({
      message: "تم العثور على إعجاب بالمقال",
      likedBy: like.user, // بيانات المستخدم الذي قام بالإعجاب
    });
  } catch (error) {
    return NextResponse.json(
      { message: "فشل في استعلام المستخدم الذي قام بالإعجاب بالمقال", error },
      { status: 500 }
    );
  }
};
