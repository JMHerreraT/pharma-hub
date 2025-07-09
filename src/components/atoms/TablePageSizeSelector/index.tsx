import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TablePageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  options?: number[];
}

export const TablePageSizeSelector: React.FC<TablePageSizeSelectorProps> = ({
  pageSize,
  onPageSizeChange,
  options = [3, 5, 10, 20, 50],
}) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-slate-600">Show</span>
      <Select
        value={pageSize.toString()}
        onValueChange={(value: string) => onPageSizeChange(Number(value))}
      >
        <SelectTrigger className="w-16 h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
