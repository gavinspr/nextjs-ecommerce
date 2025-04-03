import { CategoryFormValues } from "@nextjs-ecommerce/db/src/types";

export const saveCategory = async (values: CategoryFormValues, id?: string) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(key, value, value.name);
    } else {
      formData.append(key, value.toString());
    }
  });

  const endpoint = id ? `/api/categories?id=${id}` : "/api/categories";
  const url = `${process.env.BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: id ? "PUT" : "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to save category");
  }

  return response.json();
};
