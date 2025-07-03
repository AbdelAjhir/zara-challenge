import React from "react";

import Headline from "@/components/ui/Headline";
import { removeDuplicatedProducts } from "@/lib/helpers";
import type { ProductDetails } from "@/schemas/productDetailSchema";

import SimilarItem from "./SimilarItemsItem/SimilarItem";

import "./SimilarItems.scss";

const SimilarItems = React.memo(
  ({
    similarProducts,
  }: {
    similarProducts: ProductDetails["similarProducts"];
  }) => {
    const uniqueProducts = removeDuplicatedProducts(similarProducts);
    return (
      <section className="similar-items wrapper">
        <Headline title="Similar Items" />
        <ul className="similar-items__list">
          {uniqueProducts.map((item) => (
            <SimilarItem item={item} key={item.id} />
          ))}
        </ul>
      </section>
    );
  }
);

export default SimilarItems;
