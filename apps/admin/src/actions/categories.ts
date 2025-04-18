"use server";

import { uploadToBlob } from "@/lib/blob-upload";
import { and, db, eq, not, sql } from "@nextjs-ecommerce/db";
import { categoriesTable } from "@nextjs-ecommerce/db/src/schemas";
import { categorySelectSchema } from "@nextjs-ecommerce/db/src/types";
import { revalidatePath } from "next/cache";
import {
  createCategoryFormSchema,
  updateCategoryFormSchema,
} from "@/validators/category";
import { InsertCategory, UpdateCategory } from "@/types/category";

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

export async function checkCategoryNameUnique(
  name: string,
  excludeId?: string
) {
  const query = excludeId
    ? db
        .select()
        .from(categoriesTable)
        .where(
          and(
            eq(categoriesTable.name, name),
            not(eq(categoriesTable.id, excludeId))
          )
        )
    : db.select().from(categoriesTable).where(eq(categoriesTable.name, name));

  const existingCategories = await query;
  return existingCategories.length === 0;
}

export async function createCategory(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const validated = await createCategoryFormSchema.safeParseAsync(rawData);

    const isNameUnique = await checkCategoryNameUnique(
      formData.get("name") as string
    );
    if (!isNameUnique) {
      throw new Error("Category name already exists");
    }

    if (!validated.success) {
      console.error("Validation errors:", validated.error.format());
      throw new Error("Invalid form data");
    }

    const { image, ...restData } = validated.data;

    const imageUrl = await uploadToBlob(image);

    const categoryData: InsertCategory = { ...restData, image: imageUrl };

    await db.insert(categoriesTable).values(categoryData).returning();

    revalidatePath("/products/categories");
  } catch (error: unknown) {
    console.error("Category creation error:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to create category");
  }
}

export async function updateCategory(id: string, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const validated = await updateCategoryFormSchema.safeParseAsync(rawData);

    const isNameUnique = await checkCategoryNameUnique(
      formData.get("name") as string,
      id
    );
    if (!isNameUnique) {
      throw new Error("Category name already exists");
    }

    if (rawData.image instanceof File && rawData.image.size === 0) {
      delete rawData.image;
    }

    if (!validated.success) {
      console.error("Validation errors:", validated.error.format());
      throw new Error("Invalid form data");
    }

    const { image, ...restData } = validated.data;

    const updateData: UpdateCategory = { ...restData };

    if (image) {
      updateData.image = await uploadToBlob(image);
    }

    await db
      .update(categoriesTable)
      .set(updateData)
      .where(eq(categoriesTable.id, id))
      .returning();

    revalidatePath("/dashboard/categories");
  } catch (error: unknown) {
    throw error instanceof Error
      ? error
      : new Error("Failed to update category");
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
