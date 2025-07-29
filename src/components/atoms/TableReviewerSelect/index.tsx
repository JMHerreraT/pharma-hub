import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TableReviewerSelectProps {
  id: string;
  reviewer: string;
}

export const TableReviewerSelect: React.FC<TableReviewerSelectProps> = ({ id, reviewer }) => {
  const isAssigned = reviewer !== "Assign reviewer";

  if (isAssigned) {
    return <span>{reviewer}</span>;
  }

  return (
    <>
      <Label htmlFor={id} className="sr-only">
        Reviewer
      </Label>
      <Select>
        <SelectTrigger className="h-8 w-40" id={id}>
          <SelectValue placeholder="Assign reviewer" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
          <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
