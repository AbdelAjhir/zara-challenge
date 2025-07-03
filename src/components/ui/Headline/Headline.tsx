import React from "react";

import "./Headline.scss";

const Headline: React.FC<{ title: string }> = React.memo(({ title }) => {
  return <h1 className="headline">{title}</h1>;
});

export default Headline;
