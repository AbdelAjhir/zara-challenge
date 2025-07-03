import React, { useCallback } from "react";

import { useNavigate } from "react-router-dom";

import backIcon from "@/assets/back.png";
import "./Back.scss";

const Back: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="back" onClick={handleBack}>
      <div className="back__icon">
        <img alt="back" src={backIcon} />
      </div>
      <div className="back__text">
        <span>Back</span>
      </div>
    </div>
  );
});

export default Back;
