import React from "react";

import { useNavigate } from "react-router-dom";

import StatusPage from "@/components/ui/StatusPage";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <StatusPage
      buttonLabel="Browse products"
      icon={"404"}
      message="Sorry, the page you're looking for doesn't exist."
      title="Page Not Found"
      onButtonClick={() => navigate("/")}
    />
  );
};

export default NotFoundPage;
