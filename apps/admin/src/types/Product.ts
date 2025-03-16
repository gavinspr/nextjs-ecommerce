// todo: add customizable product attributes

import { ProductStatus } from "./ProductStatus";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  rating: number;
  featured: boolean;
  status: ProductStatus;
}
