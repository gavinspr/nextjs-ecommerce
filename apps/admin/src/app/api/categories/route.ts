import { NextResponse } from "next/server";
import { uploadToBlob } from "@/lib/blob-upload";
import { categoriesTable } from "@nextjs-ecommerce/db/src/schemas";
import { db, eq } from "@nextjs-ecommerce/db";

export async function POST(request: Request) {
  const formData = await request.formData();

  try {
    const imageFile = formData.get("image") as File;
    if (!imageFile) throw new Error("Image is required");

    const imageUrl = await uploadToBlob(imageFile);

    const categoryData = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      image: imageUrl,
    };

    const [newCategory] = await db
      .insert(categoriesTable)
      .values(categoryData)
      .returning();

    return NextResponse.json(newCategory);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create category";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const formData = await request.formData();

  if (!id) {
    return NextResponse.json({ error: "Missing category ID" }, { status: 400 });
  }

  try {
    const updateData: {
      name?: string;
      description: string | null;
      image?: string;
    } = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
    };

    const imageFile = formData.get("image");
    if (imageFile instanceof File && imageFile.size > 0) {
      updateData.image = await uploadToBlob(imageFile);
    }

    const [updatedCategory] = await db
      .update(categoriesTable)
      .set(updateData)
      .where(eq(categoriesTable.id, id))
      .returning();

    return NextResponse.json(updatedCategory);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update category";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
