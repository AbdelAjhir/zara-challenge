import React from "react";

import { useNavigate } from "react-router-dom";
interface SimilarItemProps {
  item: {
    id: string;
    name: string;
    brand: string;
    basePrice: string | number;
    imageUrl: string;
  };
}

const SimilarItem: React.FC<SimilarItemProps> = React.memo(({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${item.id}`);
  };

  return (
    <li className="similar-items__item" key={item.id} onClick={handleClick}>
      <div className="similar-items__item-content">
        <div className="similar-items__item-content-image">
          <img alt={item.name} src={item.imageUrl} />
        </div>
        <div className="similar-items__item-content-info">
          <h2 className="similar-items__item-content-info-title">
            {item.brand}
          </h2>
          <div className="similar-items__item-content-info-details">
            <p className="similar-items__item-content-info-name">{item.name}</p>
            <p className="similar-items__item-content-info-price">
              {item.basePrice} eur
            </p>
          </div>
        </div>
      </div>
    </li>
  );
});

export default SimilarItem;
