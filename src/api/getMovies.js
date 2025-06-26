const API_KEY = "7dc98318f93d49effda7a5552fe961f6";
const BASE_URL = "https://api.themoviedb.org/3";

const movieIds = [
  976893, 1574, 129, 496243, 9693, 531428, 406, 414906, 843, 290098, 170, 4977,
  4232, 68718, 25237, 238, 264644, 505192, 429, 1064213, 530915, 310131, 128,
  447365, 580175, 389, 10494, 792307,
];

const posterAlternativeIndexes = {
  1574: 10, // Chicago
  496243: 1, // Parasite
  9693: 1, // Children of men
  531428: 0, // Portrait of lady on fire
  406: 1, // La Haine
  414906: 6, // The Batman
  843: 3, // In the mood for love
  290098: 0, // The Handmaiden
  170: 56, // 28 days later
  4977: 6, // Paprika
  68718: 15, // Django Unchained
  25237: 3, // Come and see
  238: 23, // The godfather
  505192: 6, // Shoplifters
  429: 49, // The good the bad the ugly
  1064213: 3, // Anora
  530915: 4, //1917
  310131: 6, //The Witch
  128: 52, //Mononoké
  447365: 1, //Guardian Galaxy vol3
  580175: 8, //Another Round
  389: 9, // 12 angry men
  10494: 12, // Perfect Blue
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

    const alternativePosters = imagesData.posters
      .filter(
        (p) =>
          p.file_path &&
          p.file_path !== data.poster_path &&
          p.iso_639_1 === "en"
      )
      .map((p) => `https://image.tmdb.org/t/p/w300${p.file_path}`);

    const posterIndex = posterAlternativeIndexes[id];

    const posterToUse =
      posterIndex !== undefined && alternativePosters[posterIndex]
        ? alternativePosters[posterIndex]
        : `https://image.tmdb.org/t/p/w300${data.poster_path}`;

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
