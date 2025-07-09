import { TablePaginationButton } from "@/components/atoms/TablePaginationButton";
import { TablePageInfo } from "@/components/atoms/TablePageInfo";
import { TablePageSizeSelector } from "@/components/atoms/TablePageSizeSelector";
import { TablePaginationNumbers } from "@/components/molecules/TablePaginationNumbers";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  canPreviousPage,
  canNextPage,
  onPreviousPage,
  onNextPage,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <TablePaginationButton
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
        >
          Prev
        </TablePaginationButton>

        <TablePaginationNumbers
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />

        <TablePaginationButton
          onClick={onNextPage}
          disabled={!canNextPage}
        >
          Next
        </TablePaginationButton>
      </div>

      <div className="flex items-center space-x-4">
        <TablePageInfo totalItems={totalItems} />
        <TablePageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
};
