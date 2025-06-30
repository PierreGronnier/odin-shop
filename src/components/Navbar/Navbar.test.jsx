import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Navbar Component", () => {
  it("renders the navbar correctly", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText("Ciné Shop")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
  });
});
