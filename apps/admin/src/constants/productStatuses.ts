import { ProductStatus } from "@/types/ProductStatus";

export const PRODUCT_STATUSES = [
  "Active",
  "Out of Stock",
  "Preorder",
  "Backordered",
  "Discontinued",
  "Limited Stock",
] as const satisfies ReadonlyArray<string>;

export const PRODUCT_STATUS_OPTIONS = PRODUCT_STATUSES.map((status) => ({
  label: status,
  value: status,
})) as ReadonlyArray<{ label: string; value: ProductStatus }>;
