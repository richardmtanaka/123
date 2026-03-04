export type IconName =
  | "add"
  | "close"
  | "delete"
  | "edit"
  | "chevronright"
  | "chevronleft";

export interface IconButtonProps {
  icon: IconName;
  title: string;
  variant?: "bare" | "container" | "border";
  onClick?: () => void;
  size?: "small" | "default";
  disabled?: boolean;
}

const iconPaths: Record<IconName, { d: string; viewBox: string }> = {
  add: {
    viewBox: "0 0 12 12",
    d: "M7 5V1H5v4H1v2h4v4h2V7h4V5H7z",
  },
  close: {
    viewBox: "0 0 12 12",
    d: "M7.4 6l4.3-4.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L6 4.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L4.6 6 .3 10.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L6 7.4l4.3 4.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L7.4 6z",
  },
  delete: {
    viewBox: "0 0 12 12",
    d: "M7.4 6l4.3-4.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L6 4.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L4.6 6 .3 10.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L6 7.4l4.3 4.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L7.4 6z",
  },
  edit: {
    viewBox: "0 0 16 16",
    d: "M11.4 1.2l3.4 3.4c.2.2.2.5 0 .7L5.2 14.8c-.1.1-.2.1-.3.2l-4 1c-.3.1-.6 0-.7-.3-.1-.1-.1-.2 0-.4l1-4c0-.1.1-.2.2-.3L10.7 1.2c.2-.2.5-.2.7 0zM3.1 11.5l-.7 2.8 2.8-.7L3.1 11.5z",
  },
  chevronright: {
    viewBox: "0 0 16 16",
    d: "M6 3.5L10.5 8 6 12.5",
  },
  chevronleft: {
    viewBox: "0 0 16 16",
    d: "M10 3.5L5.5 8 10 12.5",
  },
};

const variantClassMap: Record<string, string> = {
  bare: "slds-button_icon-bare",
  container: "slds-button_icon-container",
  border: "slds-button_icon-border",
};

export function IconButton({
  icon,
  title,
  variant = "bare",
  onClick,
  size = "default",
  disabled,
}: IconButtonProps) {
  const { d, viewBox } = iconPaths[icon];
  const isChevron = icon === "chevronright" || icon === "chevronleft";

  const classes = [
    "slds-button",
    "slds-button_icon",
    variantClassMap[variant],
    size === "small" ? "slds-button_icon-small" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        className="slds-button__icon"
        viewBox={viewBox}
        width={size === "small" ? 12 : 16}
        height={size === "small" ? 12 : 16}
        aria-hidden="true"
      >
        {isChevron ? (
          <path
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path d={d} fill="currentColor" />
        )}
      </svg>
      <span className="slds-assistive-text">{title}</span>
    </button>
  );
}
