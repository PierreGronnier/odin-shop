import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
import { BrowserRouter as Router } from "react-router-dom";

describe("Home Component", () => {
  it("renders the home page correctly", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText("Experience Absolute Cinema")).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return content.includes("Welcome to Ciné Shop");
      })
    ).toBeInTheDocument();
  });
});
