import {
  insertProductSchema,
  productFormSchema,
  productStatusSchema,
  productWithRelationsSchema,
  selectProductSchema,
  updateProductSchema,
} from "../schemas/products";
import { z } from "zod";

export type Product = z.infer<typeof selectProductSchema>;
export type ProductStatus = z.infer<typeof productStatusSchema>;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;

export type ProductFormValues = z.infer<typeof productFormSchema>;

export type ProductWithRelations = z.infer<typeof productWithRelationsSchema>;
