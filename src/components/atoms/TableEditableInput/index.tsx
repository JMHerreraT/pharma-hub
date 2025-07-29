import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface TableEditableInputProps {
  id: string;
  value: string;
  header: string;
  align?: "left" | "right";
  width?: string;
}

export const TableEditableInput: React.FC<TableEditableInputProps> = ({
  id,
  value,
  header,
  align = "left",
  width = "w-16",
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: `Saving ${header}`,
      success: "Done",
      error: "Error",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor={id} className="sr-only">
        {header}
      </Label>
      <Input
        className={`h-8 ${width} border-transparent bg-transparent ${
          align === "right" ? "text-right" : "text-left"
        } shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background`}
        defaultValue={value}
        id={id}
      />
    </form>
  );
};
