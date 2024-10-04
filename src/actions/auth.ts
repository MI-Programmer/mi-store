"use server";

import { redirect } from "next/navigation";
import { compare, hashSync } from "bcrypt-ts";

import { getUserByEmail } from "@/actions/user";
import { prisma } from "@/lib/db";
import { signIn, signOut } from "@/lib/auth";
import { credentialsSchema } from "@/lib/zod";
import { catchAsync } from "@/utils/catchAsync";

interface CredsProps {
  email: string;
  password: string;
}

export const registerCreds = catchAsync(
  async ({ email, password }: CredsProps) => {
    try {
      await credentialsSchema.parseAsync({ email, password });
    } catch (errorZod) {
      throw new Error("Validation failed.");
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error(
        `Email "${email}" is already registered. Please use a different email.`,
      );
    }

    const hashedPassword = hashSync(password, 12);
    await prisma.user.create({ data: { email, password: hashedPassword } });

    redirect("/login");
  },
);

export const loginCreds = async ({ email, password }: CredsProps) => {
  try {
    await credentialsSchema.parseAsync({ email, password });
  } catch (error) {
    throw new Error("Validation failed.");
  }

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    throw new Error(
      "Email not found. Please check your email address or sign up for a new account.",
    );
  }

  const checkPassword = await compare(password, existingUser?.password ?? "");
  if (!checkPassword) throw new Error("Incorrect password. Please try again.");

  await signIn("credentials", { email, password, redirectTo: "/account" });
};

export const loginProvider = async ({ provider }: { provider: string }) => {
  await signIn(provider, { redirectTo: "/" });
};

export const logout = async () => {
  await signOut();
};
