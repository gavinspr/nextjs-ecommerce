"use server";

import { db, eq, sql } from "@nextjs-ecommerce/db";
import { categoriesTable } from "@nextjs-ecommerce/db/src/schemas";
import { categorySelectSchema } from "@nextjs-ecommerce/db/src/types";
import { revalidatePath } from "next/cache";

// todo: secure after setting up auth

export async function getCategoryById(id: string) {
  try {
    const [result] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));

    const category = categorySelectSchema.parse(result);
    return category;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    throw new Error("Failed to fetch category");
  }
}

export async function getAllCategories() {
  try {
    const results = await db
      .select()
      .from(categoriesTable)
      .orderBy(sql`LOWER(${categoriesTable.name})`);

    const categories = results.map((result) =>
      categorySelectSchema.parse(result)
    );
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

export async function deleteCategory(id: string) {
  if (!id) {
    throw new Error("No category ID provided");
  }

  try {
    await db.delete(categoriesTable).where(eq(categoriesTable.id, id));

    revalidatePath("/products/categories");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete category (ID: ${id}):`, error);
    throw new Error("Failed to delete category");
  }
}

export async function toggleCategoryStatus(id: string, currentStatus: boolean) {
  try {
    await db
      .update(categoriesTable)
      .set({ isActive: !currentStatus })
      .where(eq(categoriesTable.id, id));

    revalidatePath("/products/categories");
    return { success: true };
  } catch (error) {
    console.error("Error updating category:", error);
    return { error: "Failed to update category status" };
  }
}
