import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import SearchWrapper from ".";

describe("SearchWrapper", () => {
  it("renders the search input and results number (basic render)", () => {
    render(<SearchWrapper resultsNumber={5} search="" setSearch={vi.fn()} />);
    expect(
      screen.getByPlaceholderText(/search for a smartphone/i)
    ).toBeInTheDocument();
    expect(screen.getByText("5 Results")).toBeInTheDocument();
  });

  it("calls setSearch when typing in the input (interaction)", () => {
    const setSearch = vi.fn();
    render(<SearchWrapper resultsNumber={0} search="" setSearch={setSearch} />);
    fireEvent.change(screen.getByPlaceholderText(/search for a smartphone/i), {
      target: { value: "galaxy" },
    });
    expect(setSearch).toHaveBeenCalledWith("galaxy");
  });

  it("clears the input when the clear button is clicked (regression)", () => {
    const setSearch = vi.fn();
    render(
      <SearchWrapper resultsNumber={1} search="test" setSearch={setSearch} />
    );
    fireEvent.click(screen.getByAltText("Clear"));
    expect(setSearch).toHaveBeenCalledWith("");
  });

  it("disables input and clear button when disabled is true (disabled state)", () => {
    const setSearch = vi.fn();
    render(
      <SearchWrapper
        disabled
        resultsNumber={1}
        search="test"
        setSearch={setSearch}
      />
    );
    const input = screen.getByPlaceholderText(/search for a smartphone/i);
    expect(input).toBeDisabled();
    const clearBtn = screen.getByAltText("Clear");
    expect(clearBtn).toHaveStyle({ opacity: 0.5 });
    fireEvent.click(clearBtn);
    expect(setSearch).not.toHaveBeenCalledWith("");
  });

  it("shows '0 Results' when resultsNumber is 0 (resultsNumber 0)", () => {
    render(<SearchWrapper resultsNumber={0} search="" setSearch={vi.fn()} />);
    expect(screen.getByText("0 Results")).toBeInTheDocument();
  });
});
