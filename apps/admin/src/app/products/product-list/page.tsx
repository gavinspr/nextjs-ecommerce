import { OverviewCards } from "@/components/OverviewCards";
import { DataTable } from "@/components/DataTable";
import { productTableColumns } from "@/components/ProductTable/productTableColumns";
import { ProductTableToolbar } from "@/components/ProductTable/ProductTableToolbar";
import { Product } from "@/types/Product";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuDownload, LuUpload } from "react-icons/lu";

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

// todo: export
// todo: import

export default async function ProductListPage() {
  const data = await getData();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex flex-col">
          <h1 className="tracking-tight">Products</h1>
          <div className="flex gap-4 mt-1 text-sm">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
              <LuDownload />
              Export
            </button>
            <button className="flex items-center gap-1 text-muted-foreground  hover:text-primary">
              <LuUpload />
              Import
            </button>
          </div>
        </div>
        <Link href="/products/add-product">
          <Button>
            <PlusCircle size={18} />
            Add New Product
          </Button>
        </Link>
      </div>
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
