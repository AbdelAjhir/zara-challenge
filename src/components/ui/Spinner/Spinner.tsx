import React from "react";
import "./Spinner.scss";

const Spinner: React.FC = React.memo(() => (
  <div className="spinner-container" role="status">
    <div className="spinner" />
  </div>
));

export default Spinner;
