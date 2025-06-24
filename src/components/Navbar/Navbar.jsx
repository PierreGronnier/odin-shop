import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import caddie from "../../assets/caddie.png";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/grow-shop.png" alt="Shop logo" />
        <h1 className="navbar-title">Odin Shop</h1>
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
        <img src={caddie} alt="Cart" />
      </div>
    </nav>
  );
}
