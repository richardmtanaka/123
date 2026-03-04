import type { ReactNode } from "react";

export interface CardProps {
  title: string;
  stepBadge?: string;
  headerRight?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function Card({
  title,
  stepBadge,
  headerRight,
  footer,
  children,
}: CardProps) {
  return (
    <article className="slds-card">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__body">
            <h2 className="slds-card__header-title">
              <span className="slds-text-heading_small">
                {stepBadge && (
                  <span
                    className="slds-badge slds-m-right_x-small"
                    style={{ verticalAlign: "middle" }}
                  >
                    {stepBadge}
                  </span>
                )}
                {title}
              </span>
            </h2>
          </div>
          {headerRight && (
            <div className="slds-no-flex">{headerRight}</div>
          )}
        </header>
      </div>
      <div className="slds-card__body slds-card__body_inner">
        {children}
      </div>
      {footer && (
        <footer className="slds-card__footer">{footer}</footer>
      )}
    </article>
  );
}
