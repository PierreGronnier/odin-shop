import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MoviePage.module.css";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("movies")) || [];
    const found = arr.find((m) => String(m.id) === id);
    setMovie(found || undefined);
  }, [id]);

  if (movie === null) {
    return (
      <div className={styles["movie-container"]}>
        <p className={styles["status-message"]}>Loading movie...</p>
      </div>
    );
  }

  if (movie === undefined) {
    return (
      <div className={styles["movie-container"]}>
        <p className={styles["status-message"]}>Movie not found.</p>
      </div>
    );
  }

  return (
    <div className={styles["movie-container"]}>
      {movie.backdrop && (
        <div
          className={styles["movie-backdrop"]}
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
      )}

      <div className={styles["content-wrapper"]}>
        <div className={styles["movie-content"]}>
          <img
            className={styles["movie-poster"]}
            src={movie.poster}
            alt={movie.title || "undefined"}
          />

          <div className={styles["movie-info"]}>
            <div className={styles["title-director-container"]}>
              <div className={styles["title-container"]}>
                <h1>{movie.title ?? "undefined"}</h1>
                <p className={styles["original-title"]}>
                  Original title: {movie.original_title ?? "undefined"}
                </p>
              </div>

              {movie.directorImage && (
                <div className={styles["director-photo-right"]}>
                  <img src={movie.directorImage} alt={movie.director} />
                  <p>{movie.director}</p>
                </div>
              )}
            </div>

            <p className={styles["director-block"]}>
              <strong>Directed by:</strong> {movie.director ?? "undefined"}
            </p>

            <p>
              <strong>Genres:</strong>{" "}
              {Array.isArray(movie.genres)
                ? movie.genres.join(", ")
                : "undefined"}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime ?? "undefined"} min
            </p>
            <p>
              <strong>Language:</strong>{" "}
              {(movie.language ?? "undefined").toUpperCase()}
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date ?? "undefined"}
            </p>
            <p>
              <strong>Price:</strong> ${movie.price ?? "undefined"}
            </p>
            <p className={styles["overview"]}>
              {movie.overview ?? "undefined"}
            </p>

            <h2>Top Cast</h2>
            <div className={styles["movie-cast"]}>
              {Array.isArray(movie.cast) && movie.cast.length > 0 ? (
                movie.cast.map((a, i) => (
                  <div key={i} className={styles["actor-card"]}>
                    <img src={a.profile} alt={a.name} />
                    <p className={styles["actor-name"]}>{a.name}</p>
                    <p className={styles["actor-role"]}>as {a.character}</p>
                  </div>
                ))
              ) : (
                <p>undefined</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
