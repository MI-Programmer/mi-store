"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

import { prisma, supabase } from "@/lib/db";
import { productSchema } from "@/lib/zod";
import { getUser } from "@/actions/user";
import { PAGE_SIZE } from "@/utils/constants";
import { createSbImagePath, getImageNameSb } from "@/utils/helper";
import { catchAsync } from "@/utils/catchAsync";

interface InputsProps {
  colors: string[] | [];
  sizes: { name: string; inStock: boolean }[] | [];
}

export const getProductsLength = async (filter: string) => {
  const filtered = filter === "all" ? {} : { where: { category: filter } };
  const length = await prisma.product.count(filtered as object);
  return length;
};

export const getProductById = async (id: string, selection?: string[]) => {
  let selected: any = selection ? { select: {} } : {};
  selection && selection.forEach((value) => (selected.select[value] = true));

  const product = await prisma.product.findUnique({
    where: { id },
    ...selected,
  });

  return product;
};

export const getAllProducts = async (page: number, filter: string) => {
  const filtered = filter === "all" ? {} : { where: { category: filter } };

  const query = {
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE * page,
    ...filtered,
  };

  const products = await prisma.product.findMany(query as object);
  return products;
};

export const createProduct = catchAsync(
  async (inputs: InputsProps, formData: FormData) => {
    const user = await getUser(["id", "role"]);
    if (user?.role !== "ADMIN")
      throw new Error("User does not have admin privileges");

    const data = Object.fromEntries(formData.entries());
    const imageFile = data.image as File;
    const productData: any = { ...data, ...inputs };
    productData.price = +productData.price;

    try {
      await productSchema.parseAsync(productData);
    } catch (error) {
      throw new Error("Validation failed");
    }

    const { imageName, imageUrl } = createSbImagePath(
      imageFile.name,
      "product",
    );
    productData.image = imageUrl;

    await prisma.product.create({ data: { ...productData } });

    const { error } = await supabase.storage
      .from("product-images")
      .upload(imageName, imageFile);
    if (error) throw new Error("Failed to upload image. Please try again.");

    revalidatePath("/admin/products");
    redirect("/admin/products");
  },
);

export const updateProduct = catchAsync(
  async (inputs: InputsProps, productId: string, formData: FormData) => {
    const user = await getUser(["role"]);
    if (user?.role !== "ADMIN")
      throw new Error("User does not have admin privileges");

    const data = Object.fromEntries(formData.entries());
    const newProduct: any = { ...data, ...inputs };
    newProduct.price = +newProduct.price;
    const imageFile = data.image as File;
    const { imageName, imageUrl } = createSbImagePath(
      imageFile.name,
      "product",
    );
    if (!imageFile.size) delete newProduct.image;

    try {
      await productSchema.parseAsync(newProduct);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error("Validation Failed");
      }
    }

    if (imageFile.size > 0) newProduct.image = imageUrl;
    const { image: oldImage }: any =
      (await getProductById(productId, ["image"])) ?? {};

    await prisma.product.update({
      where: { id: productId },
      data: { ...newProduct },
    });

    if (imageFile.size > 0) {
      let supabaseStorage = supabase.storage.from("product-images");
      const { error } = await supabaseStorage.upload(imageName, imageFile);
      if (error)
        throw new Error("Failed to update product image. Please try again.");

      if (oldImage) {
        const deleteOldImage = getImageNameSb(oldImage);

        const { error: errorDelete } = await supabaseStorage.remove([
          deleteOldImage,
        ]);
        if (error) throw new Error(errorDelete?.message);
      }
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
  },
);

export const deleteProduct = catchAsync(async (deletedProductId: string) => {
  const user = await getUser(["productIds", "role"]);
  if (user?.role !== "ADMIN")
    throw new Error("User does not have admin privileges");

  let deleteImage;

  const product = await prisma.product.delete({
    where: { id: deletedProductId },
  });

  deleteImage = product.image;

  if (deleteImage) {
    const deleteOldImage = getImageNameSb(deleteImage);

    const { error } = await supabase.storage
      .from("product-images")
      .remove([deleteOldImage]);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/products");
});
