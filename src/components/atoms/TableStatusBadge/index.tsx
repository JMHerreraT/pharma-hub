import { Badge } from "@/components/ui/badge";
import { CheckCircle2Icon, LoaderIcon } from "lucide-react";

interface TableStatusBadgeProps {
  status: string;
}

export const TableStatusBadge: React.FC<TableStatusBadgeProps> = ({ status }) => {
  return (
    <Badge
      variant="outline"
      className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
    >
      {status === "Done" ? (
        <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
      ) : (
        <LoaderIcon />
      )}
      {status}
    </Badge>
  );
};
