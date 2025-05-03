import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilters from "../SearchFilters";

describe("SearchFilters", () => {
  const setSearchTerm = jest.fn();
  const setRegionFilter = jest.fn();
  const setLanguageFilter = jest.fn();

  beforeEach(() => {
    render(
      <SearchFilters
        searchTerm=""
        setSearchTerm={setSearchTerm}
        regionFilter=""
        setRegionFilter={setRegionFilter}
        languageFilter=""
        setLanguageFilter={setLanguageFilter}
      />
    );
  });

  it("renders input and dropdowns", () => {
    expect(screen.getByPlaceholderText("Search countries...")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Regions")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Languages")).toBeInTheDocument();
  });

  it("calls setSearchTerm on input change", () => {
    const input = screen.getByPlaceholderText("Search countries...");
    fireEvent.change(input, { target: { value: "japan" } });
    expect(setSearchTerm).toHaveBeenCalledWith("japan");
  });

  it("calls setRegionFilter on select change", () => {
    const select = screen.getByDisplayValue("All Regions");
    fireEvent.change(select, { target: { value: "Asia" } });
    expect(setRegionFilter).toHaveBeenCalledWith("Asia");
  });

  it("calls setLanguageFilter on language select change", () => {
    const select = screen.getByDisplayValue("All Languages");
    fireEvent.change(select, { target: { value: "french" } });
    expect(setLanguageFilter).toHaveBeenCalledWith("french");
  });
});
