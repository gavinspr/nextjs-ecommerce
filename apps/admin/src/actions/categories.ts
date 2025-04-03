"use server";

import { db, eq } from "@nextjs-ecommerce/db";
import { categoriesTable } from "@nextjs-ecommerce/db/src/schemas";
import { categorySelectSchema } from "@nextjs-ecommerce/db/src/types";

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
