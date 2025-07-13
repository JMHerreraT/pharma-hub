import { TablePageNumber } from "@/components/atoms/TablePageNumber";
import { Button } from "@/components/ui/button";

interface TablePaginationNumbersProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const TablePaginationNumbers: React.FC<TablePaginationNumbersProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    const pages = [];

    // Si hay 7 páginas o menos, mostrar todas
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Siempre mostrar la primera página
    pages.push(1);

    // Si estamos en las primeras 4 páginas
    if (currentPage <= 4) {
      // Mostrar 1, 2, 3, 4, ..., totalPages-1, totalPages
      for (let i = 2; i <= 4; i++) {
        pages.push(i);
      }
      pages.push(-1); // ellipsis
      pages.push(totalPages - 1);
      pages.push(totalPages);
    }
    // Si estamos en las últimas 4 páginas
    else if (currentPage >= totalPages - 3) {
      // Mostrar 1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages
      pages.push(-1); // ellipsis
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    // Si estamos en el medio
    else {
      // Mostrar 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
      pages.push(-1); // ellipsis izquierda
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push(-2); // ellipsis derecha
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center space-x-1">
      {getVisiblePages().map((page, index) => {
        if (page === -1 || page === -2) {
          return (
            <Button
            key={`ellipsis-${index}`}
            variant="ghost"
            size="sm"
            className={`w-8 h-8 rounded-full border border-gray-200 text-slate-600 hover:bg-none select-none`}
            disabled
          >
            ...
          </Button>
          );
        }

        return (
          <TablePageNumber
            key={page}
            pageNumber={page}
            isActive={page === currentPage}
            onClick={onPageChange}
          />
        );
      })}
    </div>
  );
};
