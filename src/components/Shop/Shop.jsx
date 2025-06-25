import React, { useEffect, useState } from "react";
import { getMovies } from "../../api/getMovies";
import "./Shop.css";

export function Shop() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="shop-container">
      {movies.map((movie) => {
        const isExpanded = expanded[movie.id];

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

            <p className="movie-description" id={`desc-${movie.id}`}>
              {movie.overview}
            </p>

            <button
              className="see-more-btn"
              onClick={() => toggleExpand(movie.id)}
            >
              {isExpanded ? "See Less" : "See More"}
            </button>

            <div className="bottom-content">
              <p className="movie-price">{movie.price} €</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
