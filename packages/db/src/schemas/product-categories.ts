import { pgTable, uuid, primaryKey, index } from "drizzle-orm/pg-core";
import { productsTable } from "./products";
import { categoriesTable } from "./categories";
import { relations } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";

export const productCategoriesTable = pgTable(
  "product_categories",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => productsTable.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categoriesTable.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({ columns: [t.productId, t.categoryId] }),
    index("product_categories_product_id_idx").on(t.productId),
    index("product_categories_category_id_idx").on(t.categoryId),
  ]
);

export const selectProductCategorySchema = createSelectSchema(
  productCategoriesTable
);

export const createProductCategorySchema = selectProductCategorySchema.pick({
  productId: true,
  categoryId: true,
});

export const productCategoriesRelations = relations(
  productCategoriesTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productCategoriesTable.productId],
      references: [productsTable.id],
    }),
    category: one(categoriesTable, {
      fields: [productCategoriesTable.categoryId],
      references: [categoriesTable.id],
    }),
  })
);
