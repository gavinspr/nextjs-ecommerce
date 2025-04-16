import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { productsTable, selectProductSchema } from "./products";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const productImagesTable = pgTable("product_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => productsTable.id)
    .notNull(),
  url: text("url").notNull(),
  order: integer("order").notNull().default(0), // Image with order = 0 is the featured image
  altText: varchar("alt_text", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const selectProductImageSchema = createSelectSchema(productImagesTable, {
  order: z.coerce.number().int(),
});

export const insertProductImageSchema = createInsertSchema(productImagesTable, {
  productId: z.string().uuid(),
  url: z.string().url("Invalid URL format"),
  order: z.number().int().min(0).default(0),
  altText: z.string().max(255).optional(),
}).omit({
  id: true,
  createdAt: true,
});

export const productImagesRelations = relations(
  productImagesTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productImagesTable.productId],
      references: [productsTable.id],
    }),
  })
);

export const productImagesWithRelationsSchema = selectProductImageSchema.extend(
  {
    product: z.lazy(() => selectProductSchema).optional(),
  }
);
