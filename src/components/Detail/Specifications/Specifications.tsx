import React from "react";

import Headline from "@/components/ui/Headline";
import type { ProductDetails } from "@/schemas/productDetailSchema";

import SpecificationItem from "./SpecificationItem";

import "./Specifications.scss";

interface SpecificationsProps {
  name: ProductDetails["name"];
  brand: ProductDetails["brand"];
  description: ProductDetails["description"];
  specs: ProductDetails["specs"];
}

const Specifications: React.FC<SpecificationsProps> = React.memo(
  ({ name, brand, description, specs }) => {
    return (
      <section className="specifications wrapper">
        <Headline title="Specifications" />
        <ul className="specifications__list">
          <SpecificationItem spec={brand} title="Brand" />
          <SpecificationItem spec={name} title="Model" />
          <SpecificationItem spec={description} title="Description" />
          {Object.entries(specs).map(([key, value]) => (
            <SpecificationItem key={key} spec={value} title={key} />
          ))}
        </ul>
      </section>
    );
  }
);

export default Specifications;
