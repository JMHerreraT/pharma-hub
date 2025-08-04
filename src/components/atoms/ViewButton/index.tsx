import { Button } from "@/components/ui/button"

interface ViewButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function ViewButton({ children, isActive = false, onClick, variant = 'secondary' }: ViewButtonProps) {
  if (variant === 'primary') {
    return (
      <Button
        onClick={onClick}
        className="bg-teal-500 hover:bg-teal-600 text-white border-0"
      >
        {children}
      </Button>
    )
  }

  return (
    <Button
      variant={isActive ? "default" : "outline"}
      onClick={onClick}
      className={`${isActive ? 'bg-primary text-primary-foreground' : 'bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900'}`}
    >
      {children}
    </Button>
  )
}
