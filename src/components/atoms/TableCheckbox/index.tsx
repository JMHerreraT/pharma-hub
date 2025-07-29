import { Checkbox } from "@/components/ui/checkbox";

interface TableCheckboxProps {
  checked: boolean | "indeterminate";
  onCheckedChange: (value: boolean) => void;
  ariaLabel: string;
}

export const TableCheckbox: React.FC<TableCheckboxProps> = ({
  checked,
  onCheckedChange,
  ariaLabel,
}) => {
  return (
    <div className="flex items-center justify-center">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={ariaLabel}
      />
    </div>
  );
};
