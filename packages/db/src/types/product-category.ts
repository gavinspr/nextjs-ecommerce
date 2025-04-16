import { z } from "zod";
import {
  createProductCategorySchema,
  selectProductCategorySchema,
} from "../schemas/product-categories";
import { Product } from "./product";
import { Category } from "./category";

export type ProductCategory = z.infer<typeof selectProductCategorySchema>;

export type ProductCategoryWithRelations = ProductCategory & {
  product: Product;
  category: Category;
};

export type InsertProductCategory = z.infer<typeof createProductCategorySchema>;
