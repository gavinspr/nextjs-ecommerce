import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sortedState = column.getIsSorted();

  const handleClick = () => {
    const currentSort = column.getIsSorted();

    if (currentSort === "asc") {
      column.toggleSorting(true); // Set to desc
    } else if (currentSort === "desc") {
      column.clearSorting();
    } else {
      column.toggleSorting(false); // Set to asc
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={handleClick}
      >
        <span>{title}</span>
        {sortedState === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : sortedState === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
