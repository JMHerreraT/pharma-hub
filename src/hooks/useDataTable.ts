import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

interface UseDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  initialPageSize?: number;
}

export function useDataTable<TData>({
  data,
  columns,
  initialPageSize = 10
}: UseDataTableProps<TData>) {
  const [pageSize, setPageSize] = useState(initialPageSize);

  return {
    data,
    columns,
    pageSize,
    setPageSize,
  };
}
