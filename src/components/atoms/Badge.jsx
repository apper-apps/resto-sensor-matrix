import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default", 
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    primary: "bg-primary-100 text-primary-800 hover:bg-primary-200",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    danger: "bg-red-100 text-red-800 hover:bg-red-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;