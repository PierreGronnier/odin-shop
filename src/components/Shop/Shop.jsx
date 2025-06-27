import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../../api/getMovies";
import { AddToCartModal } from "../Modal/AddToCartModal";
import "./Shop.css";

export function Shop() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData);
      const initialQuantities = {};
      moviesData.forEach((movie) => {
        initialQuantities[movie.id] = 1;
      });
      setQuantities(initialQuantities);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const increment = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 1),
    }));
  };

  const addToCart = (movie) => {
    const quantity = quantities[movie.id] || 1;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === movie.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === movie.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { ...movie, quantity }];
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  if (loading) return <p>Loading movies...</p>;

  return (
    <div className="shop-container">
      <AddToCartModal visible={showModal} />
      {movies.map((movie) => {
        const isExpanded = expanded[movie.id];
        const quantity = quantities[movie.id] || 1;
        const DESCRIPTION_LIMIT = 140;
        const showSeeMore = movie.overview.length > DESCRIPTION_LIMIT;

        return (
          <div
            key={movie.id}
            className={`movie-card ${isExpanded ? "expanded" : ""}`}
          >
            <Link
              to={`/movie/${movie.id}`}
              onClick={() =>
                localStorage.setItem("selectedMovie", JSON.stringify(movie))
              }
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
                loading="lazy"
              />
            </Link>
            <Link
              to={`/movie/${movie.id}`}
              className="movie-title-link"
              onClick={() =>
                localStorage.setItem("selectedMovie", JSON.stringify(movie))
              }
            >
              <h3 className="movie-title">{movie.title}</h3>
            </Link>
            <p className="movie-info">
              {movie.director} | {new Date(movie.release_date).getFullYear()}
            </p>
            <p className="movie-description">
              {isExpanded
                ? movie.overview
                : movie.overview.slice(0, DESCRIPTION_LIMIT) +
                  (showSeeMore ? "..." : "")}
            </p>
            {showSeeMore && (
              <button
                className="see-more-btn"
                onClick={() => toggleExpand(movie.id)}
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}
            <div className="bottom-content">
              <div className="quantity-selector">
                <button onClick={() => decrement(movie.id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => increment(movie.id)}>+</button>
              </div>
              <p className="movie-price">{movie.price} €</p>
              <button className="add-to-cart" onClick={() => addToCart(movie)}>
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
