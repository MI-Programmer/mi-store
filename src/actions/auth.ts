"use server";

import { ZodError } from "zod";
import { redirect } from "next/navigation";
import { compareSync, hashSync } from "bcrypt-ts";

import { getUserByEmail, getUser } from "@/actions/user";
import { prisma } from "@/lib/db";
import { signIn, signOut } from "@/lib/auth";
import { credentialsSchema } from "@/lib/zod";

interface CredsProps {
  email: string;
  password: string;
}

export const registerCreds = async ({ email, password }: CredsProps) => {
  try {
    await credentialsSchema.parseAsync({ email, password });
  } catch (error) {
    if (error instanceof ZodError) {
      return null;
    }
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser)
    throw new Error(
      `Email "${email}" is already registered. Please use a different email.`,
    );

  try {
    const hashedPassword = hashSync(password, 12);
    await prisma.user.create({ data: { email, password: hashedPassword } });
  } catch (error) {
    throw new Error("Failed registration. Please try again");
  }

  redirect("/login");
};

export const loginCreds = async ({ email, password }: CredsProps) => {
  try {
    await credentialsSchema.parseAsync({ email, password });
  } catch (error) {
    if (error instanceof ZodError) {
      return null;
    }
  }

  const existingUser = await getUserByEmail(email);
  if (!existingUser)
    throw new Error(
      "Email not found. Please check your email address or sign up for a new account.",
    );

  const checkPassword = compareSync(password, existingUser?.password ?? "");
  if (!checkPassword) throw new Error("Incorrect password. Please try again.");

  await signIn("credentials", { email, password, redirectTo: "/account" });
};

export const loginProvider = async ({ provider }: { provider: string }) => {
  await signIn(provider, { redirectTo: "/" });
};

export const logout = async () => {
  await signOut();
};
