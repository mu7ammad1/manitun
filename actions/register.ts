"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const existingUser = await getUserByEmail(email);
  
  if (existingUser) {
    return { error: "Email already in use!" };
  }
  
  // توليد اسم المستخدم من البريد الإلكتروني
  function generateUsernameFromEmail(email: string): string {
    let username = email.split('@')[0];
    username = username.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
    return username;
  }
   
  const Gusername = generateUsernameFromEmail(email);

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username: Gusername,
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
