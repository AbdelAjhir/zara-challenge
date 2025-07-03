import React from "react";

import Button from "@/components/ui/Button";

interface StatusPageProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const StatusPage: React.FC<StatusPageProps> = ({
  icon,
  title,
  message,
  buttonLabel = "Browse products",
  onButtonClick,
}) => (
  <div className="not-found-page container">
    <div className="error-container">
      {icon && <h1>{icon}</h1>}
      <h2>{title}</h2>
      <p>{message}</p>
      {buttonLabel && onButtonClick && (
        <div className="error-actions">
          <Button variant="black" onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        </div>
      )}
    </div>
  </div>
);

export default StatusPage;
