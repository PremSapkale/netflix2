const tmdbURL = 'https://api.themoviedb.org/3';

const API_KEY = '51db12b89efa1532101047302e3268a7';

const requests = {
   fetchTrending: `${tmdbURL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
   fetchNetflixOriginals: `${tmdbURL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
   fetchTopRated: `${tmdbURL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
   fetchActionMovies: `${tmdbURL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
   fetchComedyMovies: `${tmdbURL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
   fetchHorrorMovies: `${tmdbURL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
   fetchRomanceMovies: `${tmdbURL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
   fetchDocumentaries: `${tmdbURL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;
