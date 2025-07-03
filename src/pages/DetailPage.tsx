import React from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getProductDetails } from "@/api/productApi";
import ProductInfo from "@/components/Detail/ProductInfo";
import SimilarItems from "@/components/Detail/SimilarItems";
import Specifications from "@/components/Detail/Specifications";
import Back from "@/components/ui/Back";
import Spinner from "@/components/ui/Spinner";
import StatusPage from "@/components/ui/StatusPage";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id || ""),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error && (error as any).status === 404) {
    return (
      <StatusPage
        buttonLabel="Browse products"
        icon={"📱"}
        message="Sorry, the product you're looking for doesn't exist or has been removed."
        title="Product Not Found"
        onButtonClick={() => (window.location.href = "/")}
      />
    );
  }

  if (error || !data?.data) {
    return (
      <StatusPage
        buttonLabel="Back to home"
        icon={"❌"}
        message="There was an error fetching the product. Please try again later."
        title="Error Fetching Product"
        onButtonClick={() => (window.location.href = "/")}
      />
    );
  }

  return (
    <div className="detail-page container">
      <Back />
      <ProductInfo product={data.data} />
      <Specifications
        brand={data.data.brand}
        description={data.data.description}
        name={data.data.name}
        specs={data.data.specs}
      />
      <SimilarItems similarProducts={data.data.similarProducts} />
    </div>
  );
};

export default DetailPage;
