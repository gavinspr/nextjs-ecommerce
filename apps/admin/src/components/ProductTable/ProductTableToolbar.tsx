"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { DataTableFilter } from "../DataTable/DataTableFilter";
import { Button } from "../ui/button";
import { DataTableViewOptions } from "../DataTable/DataTableViewOptions";
import { PRODUCT_STATUS_OPTIONS } from "@/constants/productStatuses";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ProductTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          placeholder="Filter products..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-xs"
        />
        <div className="flex flex-wrap items-center gap-2">
          {table.getColumn("status") && (
            <DataTableFilter
              column={table.getColumn("status")}
              title="Status"
              options={PRODUCT_STATUS_OPTIONS}
            />
          )}
          {table.getColumn("category") && (
            <DataTableFilter
              column={table.getColumn("category")}
              title="Category"
              options={[{ value: "", label: "" }]}
            />
          )}
          {isFiltered && (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()}>
              <span>Reset</span>
              <X className="mt-[2px]" />
            </Button>
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
