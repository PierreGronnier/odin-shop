import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Shop } from "./Shop";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the getMovies function
vi.mock("../../api/getMovies", () => ({
  getMovies: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        title: "Movie 1",
        director: "Director 1",
        release_date: "2023-01-01",
        overview: "Overview 1",
        price: "10.99",
        poster: "poster1.jpg",
      },
      {
        id: 2,
        title: "Movie 2",
        director: "Director 2",
        release_date: "2023-01-02",
        overview: "Overview 2",
        price: "11.99",
        poster: "poster2.jpg",
      },
    ])
  ),
}));

describe("Shop Component", () => {
  it("renders the shop page correctly", async () => {
    render(
      <Router>
        <Shop />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
    });
  });
});
