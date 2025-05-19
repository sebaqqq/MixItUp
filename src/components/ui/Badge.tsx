import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "alcoholic" | "nonAlcoholic" | "optional";
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  variant = "default",
}) => {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

  const variantClasses = {
    default: "bg-mint-100 text-mint-800",
    outline: "border border-dark-200 text-dark-700",
    alcoholic: "bg-rose-100 text-rose-800 border border-rose-200",
    nonAlcoholic: "bg-mint-100 text-mint-800 border border-mint-200",
    optional: "bg-amber-100 text-amber-800 border border-amber-200",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
