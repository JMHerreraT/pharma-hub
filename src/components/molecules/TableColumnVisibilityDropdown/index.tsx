import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Columns3, ChevronDown, RefreshCcw } from "lucide-react";
import { TableSearchInput } from "@/components/atoms/TableSearchInput";

interface Column {
  id: string;
  getCanHide: () => boolean;
  getIsVisible: () => boolean;
  toggleVisibility: (value: boolean) => void;
}

interface ColumnVisibilityDropdownProps {
  columns: Column[];
  searchQuery?: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export const ColumnVisibilityDropdown: React.FC<ColumnVisibilityDropdownProps> = ({
  columns,
  searchQuery,
  onSearchChange,
  onReset,
}) => {
  const filteredColumns = columns.filter((column) => {
    if (!searchQuery) return column.getCanHide();
    return (
      column.getCanHide() &&
      column.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto border-gray-200 bg-transparent hover:bg-gray-100 rounded-full h-11 text-slate-600 placeholder:text-slate-500 focus:ring-2 focus:ring-slate-200 focus:border-slate-300">
          <Columns3 /> Columns <ChevronDown className="ml-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <TableSearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search columns"
        />
        <DropdownMenuSeparator />
        {filteredColumns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className="capitalize"
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
            onSelect={(e) => e.preventDefault()}
          >
            {column.id}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onReset}>
          <RefreshCcw /> Reset
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
