import "./Home.css";
import { Link } from "react-router-dom";
import poster from "../../assets/perfect-days.jpg";

export function Home() {
  return (
    <main className="home-container">
      <section className="intro">
        <h2>Experience Absolute Cinema</h2>
        <p>
          Welcome to Odin Shop, where you can "buy" some of my favorite movies.
          A selection of films I personally love and want to share. Highlighted
          today, one of my beloved movies and a remarkable film.{" "}
          <strong>Perfect Days</strong> by Wim Wenders, a poetic journey through
          the heart of Tokyo, capturing the beauty of nature and everyday life.
          And one of the best performances of Koji Yakusho's career for which he
          was awarded Best Actor at Cannes in 2023.
        </p>
      </section>

      <section className="film-highlight">
        <div className="info-column left">
          <div className="bubble">
            <span className="label">Title</span>
            <span className="value">Perfect Days</span>
          </div>
          <div className="bubble">
            <span className="label">Director</span>
            <span className="value">Wim Wenders</span>
          </div>
          <div className="bubble">
            <span className="label">Release</span>
            <span className="value">2023</span>
          </div>
        </div>

        <div className="poster-box">
          <img src={poster} alt="Perfect Days Poster" className="film-poster" />
        </div>

        <div className="info-column right">
          <div className="bubble">
            <span className="label">Lead Actor</span>
            <span className="value">Koji Yakusho</span>
          </div>
          <div className="bubble">
            <span className="label">Awards</span>
            <span className="value">Best Actor, Cannes 2023</span>
          </div>
          <div className="bubble">
            <span className="label">Synopsis</span>
            <span className="value">
              A Tokyo janitor finds profound beauty in simplicity and routine.
            </span>
          </div>
        </div>
      </section>

      <Link to="/shop" className="shop-button">
        Visit the Shop →
      </Link>
    </main>
  );
}
