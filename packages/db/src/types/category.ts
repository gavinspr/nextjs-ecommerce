import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { categoriesTable } from "../schemas";

export const categoryInsertSchema = createInsertSchema(categoriesTable, {
  name: (schema) =>
    schema.min(2, "Category name must be at least 2 characters"),
});

export const categoryFormSchema = categoryInsertSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    image: true,
  })
  .extend({
    image: z
      .instanceof(File, { message: "Image is required" })
      .refine((file) => file.size > 0, "Image cannot be empty")
      .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only .jpg, .png, and .webp formats are supported"
      ),
  });

export const categorySelectSchema = createSelectSchema(categoriesTable);

export type Category = z.infer<typeof categorySelectSchema>;
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
