import { type ButtonHTMLAttributes, type ReactNode } from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "brand" | "neutral" | "destructive" | "outline-brand" | "success";
  size?: "small" | "default";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const variantClassMap: Record<string, string> = {
  brand: "slds-button_brand",
  neutral: "slds-button_neutral",
  destructive: "slds-button_destructive",
  "outline-brand": "slds-button_outline-brand",
  success: "slds-button_success",
};

export function Button({
  variant = "neutral",
  size = "default",
  iconLeft,
  iconRight,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = [
    "slds-button",
    variantClassMap[variant],
    size === "small" ? "slds-button_small" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {iconLeft && (
        <span className="slds-button__icon slds-button__icon_left">
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span className="slds-button__icon slds-button__icon_right">
          {iconRight}
        </span>
      )}
    </button>
  );
}
