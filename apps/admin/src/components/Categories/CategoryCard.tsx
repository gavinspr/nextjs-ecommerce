"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@nextjs-ecommerce/db/src/types";
import { deleteCategory, toggleCategoryStatus } from "@/actions/categories";
import { toast } from "sonner";
import { useState } from "react";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleStatus = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    toast.promise(toggleCategoryStatus(category.id, category.isActive), {
      loading: "Updating status...",
      success: () => {
        setDropdownOpen(false);
        return `Category is now ${!category.isActive ? "active" : "inactive"}`;
      },
      error: (err) => err.message || "Failed to update category status",
    });
  };

  const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    toast.promise(deleteCategory(category.id), {
      loading: "Deleting category...",
      success: () => {
        return "Category deleted successfully!";
      },
      error: (err) => err.message || "Failed to delete category",
    });
  };

  return (
    <Card className="overflow-hidden group h-72 cursor-pointer relative">
      <div className="absolute inset-0">
        <Image
          src={category.imageUrl}
          alt={category.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          fill
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
      </div>
      <CardContent className="absolute inset-0 flex items-end p-4">
        <div className="absolute top-3 left-3">
          <Badge
            className={cn(
              "rounded-sm text-md text-white",
              category.isActive ? "bg-green-500" : "bg-gray-500"
            )}
          >
            {category.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Action Menu - Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-black/20 hover:bg-black/40 rounded-full text-white"
                onClick={(e) => e.preventDefault()}
              >
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link
                href={`/products/categories/${category.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleToggleStatus}>
                {category.isActive ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Card Content */}
        <Link
          href={`/products/categories/${category.id}`}
          className="absolute inset-0"
        >
          <div className="absolute bottom-4 left-4 text-white">
            <h2>{category.name}</h2>
            <p className="text-white/80">0 Products</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
