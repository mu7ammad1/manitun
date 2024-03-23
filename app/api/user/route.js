// http://localhost:3000/api/user
import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export const PUT = async () => {
  try {
    // استعلام عن جميع الأمثلة
    const user = await db.user.findMany();

    // إرجاع الأمثلة في حالة نجاح
    return NextResponse.json({ examples });
  } catch (error) {
    // إرجاع رسالة خطأ في حالة حدوث خطأ
    return NextResponse.json(
      { message: "Failed to fetch examples", error },
      { status: 500 }
    );
  }
}