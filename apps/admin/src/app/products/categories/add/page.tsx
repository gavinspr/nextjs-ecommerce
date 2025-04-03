import { saveCategory } from "@/services/save-category";
import { CategoryForm } from "@/components/CategoryForm";
import { CategoryFormValues } from "@nextjs-ecommerce/db/src/types";

export default function AddCategoryPage() {
  async function handleSubmit(values: CategoryFormValues) {
    "use server";
    await saveCategory(values);
  }

  return (
    <div className="">
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
