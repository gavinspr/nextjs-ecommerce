import {
  decimal,
  integer,
  json,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { selectProductSchema, productsTable } from "./products";
import { relations } from "drizzle-orm";
import { timestamps } from "../helpers/columns";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  selectProductRatingsSchema,
  productRatingsTable,
} from "./product-ratings";

// If only one variant exists, it will be the default variant and have no attributes

export const productVariantStockStatusEnum = pgEnum("variant_stock_status", [
  "In Stock",
  "Out of Stock",
  "Preorder",
  "Backordered",
  "Discontinued",
  "Limited Stock",
]);

export const productVariantsTable = pgTable("product_variants", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => productsTable.id, { onDelete: "cascade" })
    .notNull(),
  sku: varchar("sku", { length: 50 }).unique().notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull().default(0),
  stockStatus: productVariantStockStatusEnum("stock_status")
    .notNull()
    .default("Out of Stock"),
  lowStockThreshold: integer("low_stock_threshold").notNull().default(10),
  lowStockNotifiedAt: timestamp("low_stock_notified_at", {
    withTimezone: true,
  }),
  attributes: json("attributes").$type<{ size?: string; color?: string }>(),
  ...timestamps,
});

export const productVariantAttributesSchema = z
  .object({
    size: z.string().optional(),
    color: z.string().optional(),
  })
  .passthrough();

export const selectProductVariantSchema = createSelectSchema(
  productVariantsTable,
  {
    stock: z.coerce.number().int(),
    lowStockThreshold: z.coerce.number().int(),
    attributes: productVariantAttributesSchema.nullable(),
  }
);

export const productVariantStockStatusSchema = z.enum(
  productVariantStockStatusEnum.enumValues
);

export const insertProductVariantSchema = createInsertSchema(
  productVariantsTable,
  {
    productId: z.string().uuid(),
    sku: z
      .string()
      .min(1, "SKU must be at least 1 character")
      .max(50, "SKU cannot exceed 50 characters"),
    price: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format (e.g., 123.45)")
      .refine((val) => parseFloat(val) >= 0, {
        message: "Price must not be negative",
      }),
    stock: z.number().int().nonnegative().default(0),
    stockStatus: productVariantStockStatusSchema.default("Out of Stock"),
    lowStockThreshold: z.number().int().nonnegative().default(10),
    attributes: productVariantAttributesSchema.optional(),
  }
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProductVariantSchema = insertProductVariantSchema
  .partial()
  .extend({
    id: z.string().uuid(),
  });

// todo:
export const productVariantFormSchema = insertProductVariantSchema.omit({
  productId: true,
});

export const productVariantsRelations = relations(
  productVariantsTable,
  ({ many, one }) => ({
    product: one(productsTable, {
      fields: [productVariantsTable.productId],
      references: [productsTable.id],
    }),
    rating: many(productRatingsTable),
  })
);

export const productVariantWithRelationsSchema =
  selectProductVariantSchema.extend({
    product: z.lazy(() => selectProductSchema.optional()),
    rating: z.array(selectProductRatingsSchema).optional(),
  });
