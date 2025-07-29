import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import { Table as TanstackTable } from "@tanstack/react-table";
import { TableColumnsDropdown } from "../TableColumnsDropdown";

interface TableTabsHeaderProps<TData> {
  table: TanstackTable<TData>;
}

export function TableTabsHeader<TData>({ table }: TableTabsHeaderProps<TData>) {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6">
      <Label htmlFor="view-selector" className="sr-only">
        View
      </Label>
      <Select defaultValue="outline">
        <SelectTrigger className="@4xl/main:hidden flex w-fit" id="view-selector">
          <SelectValue placeholder="Select a view" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="outline">Outline</SelectItem>
          <SelectItem value="past-performance">Past Performance</SelectItem>
          <SelectItem value="key-personnel">Key Personnel</SelectItem>
          <SelectItem value="focus-documents">Focus Documents</SelectItem>
        </SelectContent>
      </Select>
      <TabsList className="@4xl/main:flex hidden">
        <TabsTrigger value="outline">Outline</TabsTrigger>
        <TabsTrigger value="past-performance" className="gap-1">
          Past Performance{" "}
          <Badge
            variant="secondary"
            className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
          >
            3
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="key-personnel" className="gap-1">
          Key Personnel{" "}
          <Badge
            variant="secondary"
            className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
          >
            2
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
      </TabsList>
      <div className="flex items-center gap-2">
        <TableColumnsDropdown table={table} />
        <Button variant="outline" size="sm">
          <PlusIcon />
          <span className="hidden lg:inline">Add Section</span>
        </Button>
      </div>
    </div>
  );
}
