import { z } from "zod";
import {
  insertProductImageSchema,
  productImagesWithRelationsSchema,
  selectProductImageSchema,
} from "../schemas/product-images";

export type ProductImage = z.infer<typeof selectProductImageSchema>;

export type InsertProductImage = z.infer<typeof insertProductImageSchema>;

export type ProductImageWithRelations = z.infer<
  typeof productImagesWithRelationsSchema
>;
