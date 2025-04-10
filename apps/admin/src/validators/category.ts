import { checkCategoryNameUnique } from "@/actions/categories";
import { categoriesTable } from "@nextjs-ecommerce/db/src/schemas";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categoryInsertSchema = createInsertSchema(categoriesTable, {
  name: (schema) =>
    schema.min(2, "Category name must be at least 2 characters"),
});

export const baseCategoryFormSchema = categoryInsertSchema
  .omit({
    createdAt: true,
    updatedAt: true,
    image: true,
  })
  .extend({
    isActive: z.coerce.boolean(),
    id: z.string().uuid().optional(),
  });

export const createCategoryFormSchema = baseCategoryFormSchema
  .extend({
    image: z
      .instanceof(File, { message: "Image is required" })
      .refine((file) => file.size > 0, "Image cannot be empty")
      .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only .jpg, .png, and .webp formats are supported"
      ),
  })
  .refine(
    async (data) => {
      const isUnique = await checkCategoryNameUnique(data.name);
      return isUnique;
    },
    {
      message: "Category name already exists",
      path: ["name"],
    }
  );

export const updateCategoryFormSchema = baseCategoryFormSchema
  .extend({
    image: z
      .instanceof(File, { message: "Invalid file format" })
      .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only .jpg, .png, and .webp formats are supported"
      )
      .optional(),
  })
  .refine(
    async (data) => {
      console.log(data, "d");
      const isUnique = await checkCategoryNameUnique(data.name, data.id);
      return isUnique;
    },
    {
      message: "Category name already exists",
      path: ["name"],
    }
  );
