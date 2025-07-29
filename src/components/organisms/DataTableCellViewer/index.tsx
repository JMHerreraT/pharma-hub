import { ReactNode } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type Props = {
  triggerText: string;
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit?: () => void;
};

export function DataTableCellViewer({
  triggerText,
  title,
  description,
  children,
  onSubmit,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {triggerText}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          {children}
        </div>

        <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
          {onSubmit && (
            <Button className="w-full" onClick={onSubmit}>
              Submit
            </Button>
          )}
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Done
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
