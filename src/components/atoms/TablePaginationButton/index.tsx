import { Button } from "@/components/ui/button";

interface TablePaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

export const TablePaginationButton: React.FC<TablePaginationButtonProps> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="text-slate-600 hover:bg-slate-100 disabled:opacity-50"
    >
      {children}
    </Button>
  );
};
