import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { LuDownload, LuUpload } from "react-icons/lu";

export default function CategoriesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex flex-col">
          <h1 className="tracking-tight">Categories</h1>
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
        <Link href="/products/categories/add">
          <Button>
            <PlusCircle size={18} />
            Add New Category
          </Button>
        </Link>
      </div>
    </div>
  );
}
