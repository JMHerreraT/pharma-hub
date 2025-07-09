import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const TableSearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
        placeholder={placeholder}
        onKeyDown={(e) => e.stopPropagation()}
      />
      <SearchIcon className="absolute inset-y-0 my-auto left-2 h-4 w-4" />
    </div>
  );
};
