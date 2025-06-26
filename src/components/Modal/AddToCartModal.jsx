import React from "react";
import "./AddToCartModal.css";

export function AddToCartModal({ visible }) {
  if (!visible) return null;

  return (
    <div className="add-to-cart-modal">Movie successfully added to cart</div>
  );
}
