import React, { useMemo } from "react";

interface SpecificationItemProps {
  spec: string;
  title: string;
}

const SpecificationItem: React.FC<SpecificationItemProps> = React.memo(
  ({ spec, title }) => {
    const formattedTitle = useMemo(() => {
      return title
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
    }, [title]);

    return (
      <li className="specifications__list-item">
        <span className="specifications__list-item-title">
          {formattedTitle}
        </span>
        <span className="specifications__list-item-value">{spec}</span>
      </li>
    );
  }
);

export default SpecificationItem;
