import { OverviewCards } from "@/components/OverviewCards";
import { DataTable } from "@/components/DataTable/DataTable";
import { productTableColumns } from "@/components/ProductTable/productTableColumns";
import { ProductTableToolbar } from "@/components/ProductTable/ProductTableToolbar";
import { Product } from "@/types/Product";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

// temp
async function getData(): Promise<Product[]> {
  return [
    {
      id: "1",
      name: "Gadget",
      price: 10.85,
      category: "Shoes",
      stock: 13,
      sku: "SH401",
      rating: 4.8,
      featured: true,
      status: "Active",
    },
    {
      id: "2",
      name: "Thing",
      price: 10.85,
      category: "Shoes",
      stock: 13,
      sku: "SH401",
      rating: 4.8,
      featured: true,
      status: "Out of Stock",
    },
    {
      id: "3",
      name: "Item",
      price: 10.85,
      category: "Shoes",
      stock: 13,
      sku: "SH401",
      rating: 4.8,
      featured: false,
      status: "Preorder",
    },
    {
      id: "4",
      name: "Gadget",
      price: 10.85,
      category: "Shoes",
      stock: 13,
      sku: "SH401",
      rating: 4.8,
      featured: true,
      status: "Backordered",
    },
    {
      id: "5",
      name: "Gadget",
      price: 10.85,
      category: "Shoes",
      stock: 13,
      sku: "SH401",
      rating: 4.8,
      featured: false,
      status: "Discontinued",
    },
    {
      id: "6",
      name: "Gadget",
      price: 10.85,
      category: "Shoes",
      stock: 13,
      sku: "SH401",
      rating: 4.8,
      featured: true,
      status: "Limited Stock",
    },
  ];
}
export default async function ProductListPage() {
  const data = await getData();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <Link
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap
          rounded-md text-sm font-medium ring-offset-background transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
          focus-visible:ring-offset-2 bg-primary text-primary-foreground
          hover:bg-primary/90 h-10 px-4 py-2"
          href="/create-product"
        >
          <PlusCircle size={18} />
          Add New Product
        </Link>
      </div>
      <OverviewCards />
      <div className="w-full space-y-4">
        <div className="">
          <DataTable
            columns={productTableColumns}
            data={data}
            toolbar={ProductTableToolbar}
          />
        </div>
      </div>
    </div>
  );
}
