import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TableFilterProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TableFilter: React.FC<TableFilterProps> = ({
  placeholder,
  value,
  onChange,
  className = "max-w-sm",
}) => {
  return (
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" fill="currentColor" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`pl-10 bg-transparent border border-gray-200 hover:bg-gray-100 rounded-full h-11 text-slate-600 placeholder:text-slate-500 focus:ring-2 focus:ring-slate-200 focus:border-slate-300 ${className}`}
        />
      </div>
  );
};
