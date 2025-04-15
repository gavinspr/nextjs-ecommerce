"use server";

import { uploadToBlob } from "@/lib/blob-upload";
import {
  categoriesTable,
  categoryFormSchema,
  selectCategorySchema,
} from "@nextjs-ecommerce/db/src/schemas";
import { revalidatePath } from "next/cache";
import { db } from "@nextjs-ecommerce/db";
import { eq, sql } from "drizzle-orm";
import { InsertCategory, UpdateCategory } from "@nextjs-ecommerce/db/src/types";

// todo: secure after setting up auth

export async function getCategoryById(id: string) {
  try {
    const [result] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));

    const category = selectCategorySchema.parse(result);
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
      selectCategorySchema.parse(result)
    );
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

export async function createCategory(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const createSchema = categoryFormSchema(false);
    const validated = await createSchema.safeParseAsync(rawData);

    if (!validated.success) {
      console.error("Validation errors:", validated.error.format());
      throw new Error("Invalid form data");
    }

    const { image, ...restData } = validated.data;

    if (!image) {
      throw new Error("Image is required");
    }

    const imageUrl = await uploadToBlob(image);

    const categoryData: InsertCategory = { ...restData, imageUrl };

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

    const updateSchema = categoryFormSchema(true);
    const validated = await updateSchema.safeParseAsync(rawData);

    if (rawData.image instanceof File && rawData.image.size === 0) {
      delete rawData.image;
    }

    if (!validated.success) {
      console.error("Validation errors:", validated.error.format());
      throw new Error("Invalid form data");
    }

    const { image, ...restData } = validated.data;

    const updateData: UpdateCategory = { ...restData, id };

    if (image) {
      updateData.imageUrl = await uploadToBlob(image);
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
