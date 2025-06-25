const API_KEY = "7dc98318f93d49effda7a5552fe961f6";
const BASE_URL = "https://api.themoviedb.org/3";

const movieIds = [
  976893, 1574, 129, 496243, 9693, 531428, 406, 414906, 843, 290098, 170, 4977,
  4232, 68718, 25237, 238,
];

export async function getMovies() {
  const promises = movieIds.map(async (id) => {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();

    const creditsRes = await fetch(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
    );
    const creditsData = await creditsRes.json();

    const directorObj = creditsData.crew.find(
      (member) => member.job === "Director"
    );

    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      poster: `https://image.tmdb.org/t/p/w300${data.poster_path}`,
      price: (Math.random() * (20 - 9.99) + 9.99).toFixed(2),
      release_date: data.release_date,
      director: directorObj ? directorObj.name : "Unknown",
    };
  });

  return Promise.all(promises);
}
