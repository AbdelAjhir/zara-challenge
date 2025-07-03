import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getProducts,
  getProductsByBrandOrName,
  DEFAULT_PRODUCT_LIMIT,
} from "@/api/productApi";
import ProductsList from "@/components/Catalog/ProductsList/ProductsList";
import SearchWrapper from "@/components/Catalog/SearchWrapper";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchUniqueProducts } from "@/lib/helpers";
import type { Products } from "@/schemas/productSchema";

const CatalogPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch.trim()) {
        return {
          data: await fetchUniqueProducts(
            (limit, offset) =>
              getProductsByBrandOrName(debouncedSearch, limit, offset),
            DEFAULT_PRODUCT_LIMIT
          ),
        };
      } else {
        return {
          data: await fetchUniqueProducts(getProducts, DEFAULT_PRODUCT_LIMIT),
        };
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const products: Products = data?.data || [];

  const isInitialFetch = !search && isLoading;
  const searchDisabled = isInitialFetch || !!error;

  return (
    <div className="catalog-page page">
      <SearchWrapper
        disabled={searchDisabled}
        resultsNumber={products.length}
        search={search}
        setSearch={setSearch}
      />
      <ProductsList
        error={error}
        isLoading={isLoading}
        isSearch={!!debouncedSearch}
        products={products}
      />
    </div>
  );
};

export default CatalogPage;
