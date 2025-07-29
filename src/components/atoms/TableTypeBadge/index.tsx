import { Badge } from "@/components/ui/badge";

interface TableTypeBadgeProps {
  type: string;
}

export const TableTypeBadge: React.FC<TableTypeBadgeProps> = ({ type }) => {
  return (
    <div className="w-32">
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {type}
      </Badge>
    </div>
  );
};
