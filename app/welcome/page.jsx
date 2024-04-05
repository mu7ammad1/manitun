import React from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function GetData() {
  const aa = await prisma.comments.findMany({
    select: {
      id: true,
      authorId: true,
      content: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return aa;
}

export default async function Welcome() {
  const Data = await GetData();
  console.log(Data);
  return (
    <main className="w-full h-full bg-secondary">
      {Data.map((item) => (
        <div key={item.id}>
          {item.authorId}
          {item.content}
        </div>
      ))}
    </main>
  );
}
