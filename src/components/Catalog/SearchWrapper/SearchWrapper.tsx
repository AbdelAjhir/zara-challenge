import React from "react";

import "./SearchWrapper.scss";
import X from "@/assets/x.png";

interface SearchWrapperProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  resultsNumber: number;
  disabled?: boolean;
}

const SearchWrapper: React.FC<SearchWrapperProps> = React.memo(
  ({ search, setSearch, resultsNumber, disabled }) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }
      setSearch(e.target.value);
    };

    const handleClear = () => {
      if (disabled) {
        return;
      }
      setSearch("");
    };

    return (
      <div className="search-container">
        <div className="container search-container__container">
          <div className="search-container__container-top">
            <input
              aria-label="Search for a smartphone by name or brand"
              data-cy="search-input"
              disabled={disabled}
              name="search"
              placeholder="Search for a smartphone..."
              type="text"
              value={search}
              onChange={handleSearch}
            />
            {search && (
              <span className="search-container__container-top-clear">
                <img
                  alt="Clear"
                  src={X}
                  style={
                    disabled ? { opacity: 0.5, pointerEvents: "none" } : {}
                  }
                  onClick={disabled ? undefined : handleClear}
                />
              </span>
            )}
          </div>
          <div className="search-container__container-bottom">
            <p aria-live="polite">{resultsNumber} Results</p>
          </div>
        </div>
      </div>
    );
  }
);

export default SearchWrapper;
