// components/atoms/TableStatus.tsx
interface TableStatusProps {
    selectedCount: number;
    totalCount: number;
  }

  export const TableStatus: React.FC<TableStatusProps> = ({
    selectedCount,
    totalCount,
  }) => {
    return (
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedCount} of {totalCount} row(s) selected.
      </div>
    );
  };
