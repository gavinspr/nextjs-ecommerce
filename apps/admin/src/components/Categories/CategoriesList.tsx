"use client";

import { useState, useCallback, useEffect } from "react";
import { SearchInput } from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { LuDownload, LuUpload } from "react-icons/lu";
import { Category } from "@nextjs-ecommerce/db/src/types";
import { CategoryCard } from "./CategoryCard";

// todo: generate featured category from db
// todo: generate new category from db
// todo: export
// todo: import

interface CategoriesListProps {
  initialCategories: Category[];
}

export const CategoriesList = ({ initialCategories }: CategoriesListProps) => {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      const filtered = initialCategories.filter((category) =>
        category.name.toLowerCase().includes(term.toLowerCase())
      );
      setCategories(filtered);
    },
    [initialCategories]
  );

  return (
    <div className="pb-20 md:pb-0">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col space-y-3 md:space-y-2">
          {/* Title and Action Buttons Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="tracking-tight">Categories</h1>

            {/* Desktop Only Add Button */}
            <div className="hidden md:flex md:items-center md:gap-2">
              <SearchInput
                isCollapsible
                onSearch={handleSearch}
                placeholder="Search categories..."
              />
              <Link href="/products/categories/add">
                <Button>
                  <PlusCircle size={18} />
                  Add New Category
                </Button>
              </Link>
            </div>
          </div>

          {/* Export/Import and Mobile Search Row */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-sm">
              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                <LuDownload />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                <LuUpload />
                <span className="hidden sm:inline">Import</span>
              </button>
            </div>

            {/* Mobile Only Search */}
            <div className="md:hidden">
              <SearchInput
                isCollapsible
                onSearch={handleSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="min-h-[300px] flex flex-col justify-center items-center text-center p-8 text-muted-foreground">
            {searchTerm ? (
              <p>
                No categories found matching &quot;
                <span className="font-semibold">{searchTerm}</span>&quot;.
              </p>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <p>No categories have been created yet.</p>
                <Link
                  href="/products/categories/add"
                  className="text-primary hover:underline font-medium"
                >
                  Add a new category
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background shadow-lg md:hidden">
        <Link href="/products/categories/add" className="block w-full">
          <Button
            variant="ghost"
            className="w-full rounded-none h-14 gap-2 text-base bg-accent"
          >
            <PlusCircle size={24} />
            Add New Category
          </Button>
        </Link>
      </div>
    </div>
  );
};
