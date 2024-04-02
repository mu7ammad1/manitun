// url : http://localhost:3000/api/TagFollow/[slug]
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { slug } = params;

    const userFollows = await db.tagFollow.findMany({
      where: {
        userId: slug,
      },
    });

    if (!userFollows) {
      return NextResponse.json({
        message: "المستخدم غير متابع لأي تاج",
      });
    }

    const tagFollow = await db.tagFollow.findMany({
      where: {
        userId: slug,
      },
      select: {
        tag: true,
        userId: true,
      },
    });

    const followStatus = userFollows ? "متابع" : "غير متابع";

    return NextResponse.json({
      message: `المستخدم ${followStatus} لهذه العلامة`,
      tagFollow,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "فشل في الحصول على بيانات المتابعة", error },
      { status: 500 }
    );
  }
};
