import { pgTable, uuid, varchar, text, boolean } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/columns";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const categoriesTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  ...timestamps,
});

export const selectCategorySchema = createSelectSchema(categoriesTable);

export const insertCategorySchema = createInsertSchema(categoriesTable, {
  name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z.string().max(500).optional(),
  imageUrl: z.string().min(1).url("Invalid URL format"),
  isActive: z.boolean().default(true),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCategorySchema = insertCategorySchema.partial().extend({
  id: z.string().uuid(),
});

export const categoryFormSchema = (isUpdate: boolean = false) =>
  insertCategorySchema
    .omit({
      imageUrl: true,
    })
    .extend({
      isActive: z.coerce.boolean(),
      image: z
        .instanceof(File, { message: "Image is required" })
        .refine((file) => file.size > 0, "Image cannot be empty")
        .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
          "Only .jpg, .png, and .webp formats are supported"
        )
        .optional()
        .superRefine((file, ctx) => {
          if (!file && !isUpdate) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Image is required",
            });
          }
        }),
    });
