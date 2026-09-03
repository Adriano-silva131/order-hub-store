import { type HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "neutral" | "danger" | "success" | "warning";
};

const variants = {
  neutral: "bg-neutral-100 text-neutral-700",
  danger: "bg-danger-50 text-danger-600",
  success: "bg-success-50 text-success-600",
  warning: "bg-neutral-100 text-warning-600",
};

export function Badge({ variant = "neutral", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-control px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
