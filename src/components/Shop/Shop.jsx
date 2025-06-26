// Shop.jsx
import React, { useEffect, useState } from "react";
import { getMovies } from "../../api/getMovies";
import "./Shop.css";

export function Shop({ cart, setCart }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data);
        const initialQuantities = {};
        data.forEach((movie) => {
          initialQuantities[movie.id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const increment = (id, stock) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min(prev[id] + 1, stock),
    }));
  };

  const decrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 1),
    }));
  };

  const addToCart = (movie, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === movie.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === movie.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...movie, quantity }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleAddToCart = (movie) => {
    const quantity = quantities[movie.id] || 1;
    addToCart(movie, quantity);
  };

  if (loading) return <p>Loading movies...</p>;

  return (
    <div className="shop-container">
      {movies.map((movie) => {
        const isExpanded = expanded[movie.id];
        const quantity = quantities[movie.id] || 1;

        return (
          <div
            key={movie.id}
            className={`movie-card ${isExpanded ? "expanded" : ""}`}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="movie-poster"
              loading="lazy"
            />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-info">
              {movie.director} | {new Date(movie.release_date).getFullYear()}
            </p>
            <p className="movie-description">{movie.overview}</p>
            <button
              className="see-more-btn"
              onClick={() => toggleExpand(movie.id)}
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
            <div className="bottom-content">
              <p className="movie-stock">{movie.stock} copies in stock</p>
              <div className="quantity-selector">
                <button onClick={() => decrement(movie.id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => increment(movie.id, movie.stock)}>
                  +
                </button>
              </div>
              <p className="movie-price">{movie.price} €</p>
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(movie)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
