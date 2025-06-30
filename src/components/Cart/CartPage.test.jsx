import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartPage } from "./CartPage";
import { BrowserRouter as Router } from "react-router-dom";

describe("CartPage Component", () => {
  it("renders the cart page correctly", () => {
    render(
      <Router>
        <CartPage />
      </Router>
    );

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });
});
