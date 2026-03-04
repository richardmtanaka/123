export interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "inverse";
}

const variantClassMap: Record<string, string> = {
  default: "",
  success: "slds-theme_success",
  warning: "slds-theme_warning",
  error: "slds-theme_error",
  inverse: "slds-badge_inverse",
};

export function Badge({ label, variant = "default" }: BadgeProps) {
  const classes = ["slds-badge", variantClassMap[variant]]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{label}</span>;
}
