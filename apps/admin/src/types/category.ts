import { baseCategoryFormSchema } from "@/validators/category";
import { categoriesTable } from "@nextjs-ecommerce/db/src/schemas";
import { z } from "zod";

export type CategoryFormValues = z.infer<typeof baseCategoryFormSchema> & {
  image?: File;
};
export type InsertCategory = typeof categoriesTable.$inferInsert;
export type UpdateCategory = Partial<InsertCategory>;
