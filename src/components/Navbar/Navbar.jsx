import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import caddie from "../../assets/caddie.png";
import github from "../../assets/github.png";

export function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalCount);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/cinema-logo.png" alt="Shop logo" />
        </Link>
        <h1 className="navbar-title">Odin Shop</h1>
        <a
          href="https://github.com/PierreGronnier"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <img src={github} alt="github logo" />
        </a>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
      <div className="navbar-cart">
        <Link to="/cart" className="cart-link">
          <img src={caddie} alt="Cart" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
