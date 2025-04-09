import { getAllCategories } from "@/actions/categories";
import { CategoriesList } from "@/components/Categories/CategoriesList";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return <CategoriesList initialCategories={categories} />;
}
