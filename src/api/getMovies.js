const API_KEY = "7dc98318f93d49effda7a5552fe961f6";
const BASE_URL = "https://api.themoviedb.org/3";

// Liste des IDs de films dans l'ordre souhaité
const movieIds = [
  976893, // Perfect Days
  531428, // Portrait of a Lady on Fire
  505192, // Shoplifters
  128, // Princesse Mononoké
  108, // Trois Couleurs : Bleu
  109, // Trois Couleurs : Blanc
  110, // Trois Couleurs : Rouge
  4977, // Paprika
  406, // La Haine
  1574, // Chicago
  1064213, // Anora
  129, // Spirited Away
  843, // In the Mood for Love
  389, // 12 Angry Men
  68718, // Django Unchained
  414906, // The Batman
  290098, // The Handmaiden
  10494, // Perfect Blue
  792307, // Poor Things
  264644, // Room
  25237, // Come and See
  238, // The Godfather
  429, // The Good, the Bad and the Ugly
  530915, // 1917
  9693, // Children of Men
  310131, // The Witch
  580175, // Another Round
  4232, // Scream
  496243, // Parasite
  1050035, // Monster
  169813, // Short term 12
  331482, // Little Women
  773, // Little Miss Sunshine
  10315, // Mr.Fox
  489, // Good Will Hunting
  115, //The Big Lebowski
];

// Films à afficher avec les affiches françaises (s'ils en ont)
const frenchPosterMovieIds = new Set([108, 109, 110]);

// Index spécifiques pour choisir une affiche alternative sur TMDB
const posterAlternativeIndexes = {
  531428: 1, // Portrait of a Lady on Fire
  505192: 7, // Shoplifters
  128: 53, // Princesse Mononoké
  108: 1, // Trois Couleurs : Bleu
  109: 1, // Trois Couleurs : Blanc
  110: 1, // Trois Couleurs : Rouge
  4977: 7, // Paprika
  406: 2, // La Haine
  1574: 11, // Chicago
  1064213: 2, // Anora
  843: 4, // In the Mood for Love
  389: 10, // 12 Angry Men
  68718: 16, // Django Unchained
  414906: 7, // The Batman
  290098: 1, // The Handmaiden
  10494: 13, // Perfect Blue
  264644: 0, // Raw (Grave)
  25237: 4, // Come and See
  238: 24, // The Godfather
  429: 50, // The Good, the Bad and the Ugly
  530915: 5, // 1917
  9693: 2, // Children of Men
  310131: 7, // The Witch
  580175: 9, // Another Round
  4232: 0, // Scream
  496243: 0, // Parasite
  1050035: 1, // Monster
  10315: 1, // Mr.Fox
  115: 2,
};

export async function getMovies() {
  const savedMovies = localStorage.getItem("movies");
  if (savedMovies) {
    const movies = JSON.parse(savedMovies);
    if (movies.length === movieIds.length) {
      return movies;
    } else {
      localStorage.removeItem("movies");
    }
  }

  const promises = movieIds.map(async (id) => {
    const [res, creditsRes, imagesRes] = await Promise.all([
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
      fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`),
    ]);

    const data = await res.json();
    const creditsData = await creditsRes.json();
    const imagesData = await imagesRes.json();

    const director = creditsData.crew.find((m) => m.job === "Director");

    const allPosters = imagesData.posters.filter((p) => p.file_path);

    const posterIndex = posterAlternativeIndexes[id];
    let posterToUse = `https://image.tmdb.org/t/p/w300${data.poster_path}`;

    if (posterIndex !== undefined) {
      const lang = frenchPosterMovieIds.has(id) ? "fr" : "en";
      const filtered = allPosters.filter((p) => p.iso_639_1 === lang);

      if (filtered.length > posterIndex) {
        posterToUse = `https://image.tmdb.org/t/p/w300${filtered[posterIndex].file_path}`;
      } else if (filtered.length > 0) {
        posterToUse = `https://image.tmdb.org/t/p/w300${filtered[0].file_path}`;
      }
    }

    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      poster: posterToUse,
      price: (Math.random() * (20 - 9.99) + 9.99).toFixed(2),
      release_date: data.release_date,
      director: director ? director.name : "Unknown",
    };
  });

  const movies = await Promise.all(promises);
  localStorage.setItem("movies", JSON.stringify(movies));
  return movies;
}
