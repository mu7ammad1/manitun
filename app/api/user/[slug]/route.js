// http://localhost:3000/api/user/slug
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { slug } = params;
    // استرداد المستخدم المعين
    const user = await db.user.findUnique({
      where: {
        username: slug,
      },
      include: {
        followers: true, // يتم استرجاع بيانات المتابعين للمستخدم
        following: true,
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

export const PUT = async (request, { params }) => {
  try {
    const { slug } = params;
    const { name, image, username, bio } = await request.json();

    // التحقق مما إذا كان المستخدم موجودًا في قاعدة البيانات
    const existingUser = await db.user.findUnique({
      where: {
        username: slug,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // تحديث معلومات المستخدم
    const updatedUser = await db.user.update({
      where: {
        username: slug,
      },
      data: {
        name,
        username,
        bio,
        image,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
};
