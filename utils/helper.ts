import { v4 as uuid } from "uuid";
import { SUPABASE_URL } from "@/utils/constants";

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

// For URL Image Supabase
export const getImageNameSb = (urlImage: string) =>
  urlImage.slice(urlImage.indexOf("ges/") + 4, urlImage.length + 1);

export const createSbImagePath = (imageFilename: string, bucket: string) => {
  const imageName = `${uuid()}-${imageFilename.replaceAll("/", "").split(".")[0]}`;
  const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}-images/${imageName}`;

  return { imageName, imageUrl };
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value,
  );
