import { type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "rounded-control px-4 py-2 text-sm font-medium transition-colors duration-[var(--dur-fast)] disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    primary: "bg-action-900 text-white hover:bg-neutral-900",
    secondary:
      "border border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
