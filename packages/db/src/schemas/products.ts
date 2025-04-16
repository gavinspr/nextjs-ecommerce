import {
  pgTable,
  uuid,
  varchar,
  text,
  decimal,
  boolean,
  check,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { productImagesTable, selectProductImageSchema } from "./product-images";
import {
  productVariantsTable,
  selectProductVariantSchema,
} from "./product-variants";
import {
  productCategoriesTable,
  selectProductCategorySchema,
} from "./product-categories";
import { timestamps } from "../helpers/columns";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import {
  productRatingsTable,
  selectProductRatingsSchema,
} from "./product-ratings";

export const productStatusEnum = pgEnum("product_status", [
  "active",
  "draft",
  "archived",
]);

export const productsTable = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    slug: varchar("slug", { length: 300 }).notNull().unique(),
    description: text("description"),
    averageRating: decimal("average_rating", {
      precision: 2,
      scale: 1,
    }).default("0.0"),
    ratingCount: integer("rating_count").default(0),
    isFeatured: boolean("is_featured").notNull().default(false),
    status: productStatusEnum("status").notNull().default("draft"),
    ...timestamps,
  },
  (t) => [
    check(
      "average_rating_check",
      sql`${t.averageRating} >= 0.0 AND ${t.averageRating} <= 5.0`
    ),
  ]
);

export const selectProductSchema = createSelectSchema(productsTable);
export const productStatusSchema = z.enum(productStatusEnum.enumValues);

export const insertProductSchema = createInsertSchema(productsTable, {
  name: (schema) => schema.min(1, "Product name is required"),
  slug: (schema) =>
    schema
      .min(1, "Slug is required")
      .max(300)
      .regex(
        /^[a-z0-9-]+$/,
        "Invalid slug format (use lowercase letters, numbers, and hyphens)"
      ),
  isFeatured: z.coerce.boolean(),
  status: productStatusSchema.default("draft"),
}).omit({
  id: true,
  ratingCount: true,
  averageRating: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProductSchema = insertProductSchema.partial().extend({
  id: z.string().uuid(),
});

export const productFormSchema = insertProductSchema.omit({ status: true });

export const productsRelations = relations(productsTable, ({ many }) => ({
  variants: many(productVariantsTable),
  categories: many(productCategoriesTable),
  images: many(productImagesTable),
  ratings: many(productRatingsTable),
}));

export const productWithRelationsSchema = selectProductSchema.extend({
  images: z.array(selectProductImageSchema).optional(),
  variants: z.array(selectProductVariantSchema).optional(),
  categories: z.lazy(() => z.array(selectProductCategorySchema).optional()), // !
  ratings: z.array(selectProductRatingsSchema).optional(),
});
