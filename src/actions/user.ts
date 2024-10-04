"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

import { auth } from "@/lib/auth";
import { prisma, supabase } from "@/lib/db";
import { userSchema } from "@/lib/zod";
import { PAGE_SIZE, SUPABASE_URL } from "@/utils/constants";
import { createSbImagePath, getImageNameSb } from "@/utils/helper";

export const getUsersLength = async (filter: string) => {
  const filtered = filter === "ALL" ? {} : { where: { role: filter } };
  const length = await prisma.user.count(filtered as object);
  return length;
};

export const getAllUsers = async (page: number, filter: string) => {
  const filtered = filter === "ALL" ? {} : { where: { role: filter } };

  const query = {
    ...filtered,
    select: { id: true, name: true, email: true, image: true, role: true },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE * page,
  };

  const users = await prisma.user.findMany(query as object);
  return users;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, password: true, email: true, name: true },
  });
  return user;
};

export const getUser = async (selection?: string[]) => {
  let selected: any = selection ? { select: {} } : {};
  selection && selection.forEach((value) => (selected.select[value] = true));

  const session = await auth();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
    ...selected,
  });

  return user;
};

export const updateUserData = async (userData: object) => {
  const user = await getUser(["id"]);
  if (!user?.id) throw new Error("User not authenticated");

  try {
    await userSchema.parseAsync(userData);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation Error:", error.errors);
      return null;
    }
  }

  try {
    await prisma.user.update({ where: { id: user.id }, data: { ...userData } });
  } catch (error) {
    throw new Error("Failed to update account. Please try again.");
  }

  revalidatePath("/account/settings");
};

export const updateUserImage = async (formData: FormData) => {
  const user = await getUser(["id"]);
  if (!user?.id) throw new Error("User not authenticated");

  const image: File = formData.get("image") as File;
  if (!image) throw new Error("Image is required!");
  const { imageName, imageUrl } = createSbImagePath(image.name, "profile");

  let supabaseStorage = supabase.storage.from("profile-images");
  const { error } = await supabaseStorage.upload(imageName, image as File);
  if (error) throw new Error("Failed to update image. Please try again.");

  const { image: oldImage }: any = await getUser(["image"]);

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { image: imageUrl },
    });
  } catch (e: any) {
    throw new Error("Failed to update image. Please try again.");
  }

  if (oldImage && oldImage?.includes(SUPABASE_URL)) {
    const deleteOldImage = getImageNameSb(oldImage);

    const { error: errorDelete } = await supabaseStorage.remove([
      deleteOldImage,
    ]);
    if (error) throw new Error(errorDelete?.message);
  }

  revalidatePath("/account/settings");
};

export const updateUserRole = async (formData: FormData) => {
  const user = await getUser(["role"]);
  if (user?.role !== "ADMIN")
    throw new Error("User does not have admin privileges");

  const id = formData.get("id") as string;
  const role = formData.get("role") as "USER" | "ADMIN";
  if (!role) return;

  try {
    await prisma.user.update({ where: { id }, data: { role } });
  } catch (error) {
    throw new Error("Failed to update user role. Please try again.");
  }

  revalidatePath("/admin/user");
};
