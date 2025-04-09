import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/Categories/CategoryForm";
import { getCategoryById, updateCategory } from "@/actions/categories";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) return notFound();

  const handleSubmit = async (formData: FormData) => {
    "use server";
    await updateCategory(id, formData);
  };

  return (
    <div>
      <CategoryForm initialData={category} onSubmit={handleSubmit} />
    </div>
  );
}
