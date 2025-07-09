interface TablePageInfoProps {
    totalItems: number;
  }

export const TablePageInfo: React.FC<TablePageInfoProps> = ({
totalItems,
}) => {
return (
    <div className="text-sm text-slate-600">
    Showing of {totalItems} Entries
    </div>
);
};
