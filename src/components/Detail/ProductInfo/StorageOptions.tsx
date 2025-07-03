import type { ProductDetails } from "@/schemas/productDetailSchema";

interface StorageOptionsProps {
  product: ProductDetails | null;
  selectedStorage: number | null;
  setSelectedStorage: React.Dispatch<React.SetStateAction<number | null>>;
}

const StorageOptions: React.FC<StorageOptionsProps> = ({
  product,
  selectedStorage,
  setSelectedStorage,
}) => (
  <>
    <div className="product-info__right-info-storage">
      <span className="product-info__right-info-storage-title">
        How much space do you need?
      </span>
    </div>
    <ul className="product-info__right-info-storage-options">
      {product?.storageOptions.map((option, idx) => (
        <li
          className={`product-info__right-info-storage-options-variant${selectedStorage === idx ? " selected" : ""}`}
          data-cy="storage-option"
          key={option.capacity}
          onClick={() => setSelectedStorage(idx)}
        >
          {option.capacity}
        </li>
      ))}
    </ul>
  </>
);

export default StorageOptions;
