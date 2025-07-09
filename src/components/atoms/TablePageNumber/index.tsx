import { Button } from "@/components/ui/button";

interface TablePageNumberProps {
  pageNumber: number;
  isActive: boolean;
  onClick: (page: number) => void;
}

export const TablePageNumber: React.FC<TablePageNumberProps> = ({
  pageNumber,
  isActive,
  onClick,
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onClick(pageNumber)}
      className={`w-8 h-8 rounded-full border border-gray-200 cursor-pointer ${
        isActive
          ? "bg-slate-800 text-white hover:bg-slate-700"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {pageNumber}
    </Button>
  );
};
