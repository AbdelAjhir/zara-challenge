import "./Button.scss";
import React from "react";

const Button = React.memo(
  ({
    children,
    onClick,
    disabled,
    className,
    variant = "black",
  }: {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    variant?: "black" | "white";
  }) => {
    return (
      <button
        className={`button ${className} ${variant}`}
        disabled={disabled}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default Button;
