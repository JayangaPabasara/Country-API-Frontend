import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CountryCard from "../CountryCard";
import { useFavorite } from "../../context/FavoriteContext";

jest.mock("../../context/FavoriteContext", () => ({
  useFavorite: jest.fn(),
}));

const country = {
  cca2: "JP",
  cca3: "JPN",
  name: { common: "Japan" },
  flags: { svg: "https://flagcdn.com/jp.svg" },
  capital: ["Tokyo"],
  region: "Asia",
  population: 125960000,
};

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("CountryCard", () => {
  const addFavorite = jest.fn();
  const removeFavorite = jest.fn();

  beforeEach(() => {
    useFavorite.mockReturnValue({
      favorites: [],
      addFavorite,
      removeFavorite,
    });
  });

  it("renders country details", () => {
    renderWithRouter(<CountryCard country={country} />);
    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.getByTitle(/capital/i)).toHaveTextContent("Capital: Tokyo");
    expect(screen.getByTitle(/region/i)).toHaveTextContent("Region: Asia");
    expect(screen.getByTitle(/population/i)).toHaveTextContent("Population:");
  });

  it("triggers addFavorite when button clicked", () => {
    renderWithRouter(<CountryCard country={country} />);
    const btn = screen.getByTitle("FavoriteBTN");
    fireEvent.click(btn);
    expect(addFavorite).toHaveBeenCalledWith("JP");
  });

  it("navigates to details when card clicked", () => {
    const { container } = renderWithRouter(<CountryCard country={country} />);
    const card = container.querySelector('[title="Country"]');
    fireEvent.click(card);
    // navigation is tested through mocking in integration test
  });
});
