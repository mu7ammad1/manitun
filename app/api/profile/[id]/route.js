// url : http://localhost:3000/api/posts/slug
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    // User Unique
    const user = await db.user.findUnique({
      where: {
        username: id,
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
      { message: "user GET ERROR0000", error },
      { status: 500 }
    );
  }
};