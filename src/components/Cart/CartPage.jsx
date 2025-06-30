import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CartPage.css";

export function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Thank you for your purchase!");
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <>
          <p className="empty-text">Your cart is empty</p>
          <div className="empty-back-container">
            <Link to="/shop" className="back-to-shop">
              Back to Shop
            </Link>
          </div>
        </>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <Link to={`/movie/${item.id}`}>
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="cart-item-poster"
                  />
                </Link>
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>
                    {item.quantity} x {item.price} €
                  </p>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <div className="left-footer">
              <Link to="/shop" className="back-to-shop">
                Back to Shop
              </Link>
            </div>

            <div className="right-footer">
              <h2 className="cart-total">Total: {totalPrice.toFixed(2)} €</h2>
              <button className="place-order-button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
