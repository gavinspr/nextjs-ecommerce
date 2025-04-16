import { z } from "zod";
import {
  insertProductVariantSchema,
  productVariantAttributesSchema,
  productVariantFormSchema,
  productVariantStockStatusSchema,
  productVariantWithRelationsSchema,
  selectProductVariantSchema,
  updateProductVariantSchema,
} from "../schemas/product-variants";

export type ProductVariant = z.infer<typeof selectProductVariantSchema>;
export type ProductVariantStockStatus = z.infer<
  typeof productVariantStockStatusSchema
>;
export type ProductVariantAttribute = z.infer<
  typeof productVariantAttributesSchema
>;

export type InsertProductVariant = z.infer<typeof insertProductVariantSchema>;
export type UpdateProductVariant = z.infer<typeof updateProductVariantSchema>;

export type ProductVariantFormValues = z.infer<typeof productVariantFormSchema>;

export type ProductVariantWithRelations = z.infer<
  typeof productVariantWithRelationsSchema
>;
