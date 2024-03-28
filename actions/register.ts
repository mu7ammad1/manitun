"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";



// دالة لإنشاء اسم مستخدم من جزء من عنوان البريد الإلكتروني
const generateUsernameFromEmail = (email: string) => {
  // قم بتقسيم عنوان البريد الإلكتروني باستخدام علامة "@" واحصل على الجزء قبلها
  const [username] = email.split("@");
  // إعادة الاسم المستخدم المستمد من جزء البريد الإلكتروني
  return username;
};




export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const username = generateUsernameFromEmail(email);

  const existingUser = await getUserByEmail(email);
  
  if (existingUser) {
    return { error: "Email already in use!" };
  }
  

  try {
    await db.user.create({
      data: {
        name,
        email,
        username, // استخدام الاسم المستخدم المولد تلقائيًا
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Failed to register user!" };
  }
}
