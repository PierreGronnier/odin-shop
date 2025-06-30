import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MoviePage from "./MoviePage";
import { BrowserRouter as Router } from "react-router-dom";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

describe("MoviePage Component", () => {
  it("renders the movie page correctly", () => {
    const mockMovie = {
      id: 1,
      title: "Movie 1",
      original_title: "Original Title 1",
      overview: "Overview 1",
      genres: ["Genre 1", "Genre 2"],
      runtime: 120,
      language: "en",
      release_date: "2023-01-01",
      director: "Director 1",
      directorImage: "director1.jpg",
      poster: "poster1.jpg",
      backdrop: "backdrop1.jpg",
      cast: [
        { name: "Actor 1", character: "Character 1", profile: "profile1.jpg" },
        { name: "Actor 2", character: "Character 2", profile: "profile2.jpg" },
      ],
      price: "10.99",
    };

    localStorage.setItem("movies", JSON.stringify([mockMovie]));

    render(
      <Router>
        <MoviePage />
      </Router>
    );

    expect(screen.getByText("Movie 1")).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return content.includes("Original Title 1");
      })
    ).toBeInTheDocument();
  });
});
