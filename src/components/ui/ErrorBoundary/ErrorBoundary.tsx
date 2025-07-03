import React from "react";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";

function DefaultFallback({ error }: FallbackProps) {
  const navigate = useNavigate();
  const handleReset = () => {
    navigate("/");
  };
  return (
    <div className="error-boundary">
      <h2>Something went wrong.</h2>
      <pre>{error.message}</pre>
      <Button onClick={handleReset}>Go Home</Button>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps> | React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={
        typeof fallback === "function" ? fallback : DefaultFallback
      }
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
