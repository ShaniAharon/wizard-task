import type {LucideIcon} from "lucide-react";

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: "secondary" | "primary" | "success" | "gradient";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}
