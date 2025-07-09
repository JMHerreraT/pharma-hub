/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TableFilter } from "@/components/molecules/TableFilter";
import { ColumnVisibilityDropdown } from "@/components/molecules/TableColumnVisibilityDropdown";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface DataTableToolbarProps {
  title?: string;
  titleClassName?: string;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterPlaceholder?: string;
  columns: Column<any, any>[];
  searchQuery?: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export const DataTableToolbar: React.FC<DataTableToolbarProps> = ({
  title,
  titleClassName,
  filterValue,
  onFilterChange,
  filterPlaceholder = "Filter...",
  columns,
  searchQuery,
  onSearchChange,
  onReset,
}) => {
  return (
    <div className="flex items-center gap-2 py-4 justify-between">
      {title && <div className={cn(
        "text-xl font-semibold",
        titleClassName
      )}>{title}</div>}
      <div className={`flex items-center gap-3 p-4 ml-auto`}>
        <TableFilter
          placeholder={filterPlaceholder}
          value={filterValue}
          onChange={onFilterChange}
        />
        <ColumnVisibilityDropdown
          columns={columns}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onReset={onReset}
        />

      </div>
    </div>
  );
};
