import { DEFAULT_PRODUCT_LIMIT } from "@/api/productApi";
import type { Products } from "@/schemas/productSchema";

export function removeDuplicatedProducts(products: Products): Products {
  const seen = new Set<string>();
  return products.filter((product) => {
    if (seen.has(product.id)) {
      return false;
    }
    seen.add(product.id);
    return true;
  });
}

export async function fetchUniqueProducts(
  fetchFn: (_limit: number, _offset: number) => Promise<{ data: Products }>,
  targetCount = DEFAULT_PRODUCT_LIMIT
): Promise<Products> {
  let all: Products = [];
  let offset = 0;

  while (all.length < targetCount) {
    const { data } = await fetchFn(targetCount, offset);
    if (!data.length) {
      break;
    }
    all = removeDuplicatedProducts([...all, ...data]);
    offset += targetCount;
    if (data.length < targetCount) {
      break;
    }
  }

  return all.slice(0, targetCount);
}
