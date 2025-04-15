import { z } from "zod";
import {
  categoryFormSchema,
  insertCategorySchema,
  selectCategorySchema,
  updateCategorySchema,
} from "../schemas/categories";

export type Category = z.infer<typeof selectCategorySchema>;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;

export type CategoryFormValues = z.infer<ReturnType<typeof categoryFormSchema>>;
