import { CategoryForm } from "@/components/Categories/CategoryForm";
import { createCategory } from "@/actions/categories";

export default function AddCategoryPage() {
  return (
    <div className="">
      <CategoryForm onSubmit={createCategory} />
    </div>
  );
}
