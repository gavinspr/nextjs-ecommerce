"use client";

import { Product } from "@/types/Product";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableRowActions } from "./ProductTableRowActions";
import { FaStar, FaCircleCheck } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { DataTableColumnHeader } from "../DataTable/DataTableColumnHeader";
import { ProductStatus } from "@/types/ProductStatus";

// todo: add product image

export const productTableColumns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price: number = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      const rating: number = parseFloat(row.getValue("rating"));

      return (
        <div className="flex items-center gap-1">
          <FaStar color="gold" size={12} />
          {rating}
        </div>
      );
    },
  },
  {
    accessorKey: "featured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Featured" />
    ),
    cell: ({ row }) => {
      const featured: boolean = row.getValue("featured");

      if (!featured) return null;

      return (
        <div className="flex justify-center items-center w-1/3">
          <FaCircleCheck size={16} className="fill-green-500" />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: ProductStatus = row.getValue("status");

      const statusStyle: string = {
        Active: "bg-green-100 text-green-800",
        "Out of Stock": "bg-red-100 text-red-800",
        Preorder: "bg-blue-100 text-blue-800",
        Backordered: "bg-yellow-100 text-yellow-800",
        Discontinued: "bg-gray-100 text-gray-800",
        "Limited Stock": "bg-orange-100 text-orange-800",
      }[status];

      return <Badge className={statusStyle}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
