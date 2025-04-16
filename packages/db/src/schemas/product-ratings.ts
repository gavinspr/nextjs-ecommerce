import {
  pgTable,
  uuid,
  text,
  integer,
  check,
  unique,
  index,
} from "drizzle-orm/pg-core";
import { productsTable, selectProductSchema } from "./products";
import { relations, sql } from "drizzle-orm";
import { timestamps } from "../helpers/columns";
import { selectUserSchema, usersTable } from "./users";
import {
  productVariantsTable,
  selectProductVariantSchema,
} from "./product-variants";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const productRatingsTable = pgTable(
  "product_ratings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .references(() => productsTable.id, { onDelete: "cascade" })
      .notNull(),
    productVariantId: uuid("product_variant_id")
      .references(() => productsTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id").references(() => usersTable.id),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    ...timestamps,
  },
  (t) => [
    unique().on(t.productId, t.productVariantId, t.userId),
    check("rating_check", sql`${t.rating} >= 1 AND ${t.rating} <= 5`),
    index("rating_product_idx").on(t.productId),
    index("rating_user_idx").on(t.userId),
  ]
);

export const selectProductRatingsSchema =
  createSelectSchema(productRatingsTable);

export const insertProductRatingSchema = createInsertSchema(
  productRatingsTable,
  {
    productId: z.string().uuid(),
    productVariantId: z.string().uuid(),
    userId: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().max(2000).optional(),
  }
).omit({ id: true, createdAt: true, updatedAt: true });

export const updateProductRatingSchema = insertProductRatingSchema
  .partial()
  .extend({ id: z.string().uuid() });

export const productRatingFormSchema = insertProductRatingSchema.omit({
  productId: true,
  productVariantId: true,
  userId: true,
});

export const productRatingsRelations = relations(
  productRatingsTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productRatingsTable.productId],
      references: [productsTable.id],
    }),
    variant: one(productVariantsTable, {
      fields: [productRatingsTable.productVariantId],
      references: [productVariantsTable.id],
    }),
    user: one(usersTable, {
      fields: [productRatingsTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const productRatingsWithRelationsSchema =
  selectProductRatingsSchema.extend({
    product: z.lazy(() => selectProductSchema).optional(),
    variant: z.lazy(() => selectProductVariantSchema).optional(),
    user: z.lazy(() => selectUserSchema).optional(),
  });
