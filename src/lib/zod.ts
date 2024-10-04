import { z } from "zod";

import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/utils/constants";

export const credentialsSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .max(
      EMAIL_MAX_LENGTH,
      `Email address cannot exceed ${EMAIL_MAX_LENGTH} characters`,
    )
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be ${PASSWORD_MIN_LENGTH} characters`,
    )
    .max(
      PASSWORD_MAX_LENGTH,
      `Password cannot exceed ${PASSWORD_MAX_LENGTH} characters`,
    ),
});

export const productSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be less than 100 characters"),

  price: z
    .number({
      required_error: "Price is required",
    })
    .positive("Price must be a positive number")
    .max(1000000, "Price cannot exceed 1 million"),

  category: z.string({ required_error: "Price is required" }),

  image: z
    .instanceof(File, { message: "Image must be a file" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "File must be an image",
    })
    .optional(),

  colors: z
    .string()
    .max(20, "Color value cannot exceed 20 characters")
    .array()
    .max(10, "You can select up to 10 colors")
    .optional(),

  sizes: z
    .object({
      name: z.string().max(10, "Size name cannot exceed 10 characters"),
      inStock: z.boolean(),
    })
    .array()
    .max(8, "You can have up to 8 sizes")
    .optional(),

  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

export const userSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .max(50, "Name should be 50 characters or less"),
  phone: z
    .string({
      required_error: "Phone is required",
    })
    .min(7, "Phone number should be at least 7 digits")
    .max(20, "Phone number should be 20 digits or less"),
  shippingAddress: z
    .string({
      required_error: "shippingAddress is required",
    })
    .max(100, "Shipping address should be 100 characters or less"),
});
