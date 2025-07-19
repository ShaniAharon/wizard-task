import {cn} from "../../utils/tailwind";
import type {ButtonProps} from "./types";

const baseStyles =
  "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium";

const commonStyles = {
  enabled: "cursor-pointer transition-colors duration-200",
  disabled: "cursor-not-allowed",
};

const disabledStyles = "text-gray-400 bg-gray-200";

const variantStyles = {
  secondary: {
    enabled: "text-gray-700 bg-gray-100 hover:bg-gray-200",
    disabled: "bg-gray-50",
  },
  primary: {
    enabled: "text-white bg-blue-600 hover:bg-blue-700",
    disabled: "",
  },
  success: {
    enabled: "text-white bg-green-600 hover:bg-green-700",
    disabled: "",
  },
  gradient: {
    enabled:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
    disabled: "bg-gray-300 text-gray-500",
  },
};

export const Button = ({
  onClick,
  disabled = false,
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  children,
  className = "",
}: ButtonProps) => {
  const styles = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        disabled
          ? [commonStyles.disabled, disabledStyles, styles.disabled]
          : [commonStyles.enabled, styles.enabled],
        className
      )}
    >
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </button>
  );
};
