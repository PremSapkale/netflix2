import React, { useState, useEffect } from 'react';
import '../styles/Row.css';
import axios from '../axios';
import TrailerWindow from './TrailerWindow';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
   const [movies, setMovies] = useState([]);
   const [selectedTrailer, setSelectedTrailer] = useState(null);

   useEffect(() => {
      // Function retreives arrays of movies and web-series from tmdb
      async function fetchData() {
         const request = await axios.get(fetchUrl);
         setMovies(request.data.results);
         return request;
      }
      fetchData();
   }, [fetchUrl]);

   // This function finds the trailer url based on the movie-id
   const handleTrailerClick = async (movieId) => {
      try {
         const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=51db12b89efa1532101047302e3268a7`
         );
         const data = await response.json();
         const trailer = data.results.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
         );
         if (trailer) {
            setSelectedTrailer(trailer);
         } else {
            console.warn('Trailer not found');
         }
      } catch (error) {
         console.error('Error fetching trailer:', error);
      }
   };

   const handleCloseModel = () => {
      setSelectedTrailer(null);
   };

   return (
      <div className='row'>
         <h2>{title}</h2>
         <div className='row__posters'>
            {movies.map((movie) => (
               <img
                  key={movie.id}
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${
                     isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  onClick={() => handleTrailerClick(movie.id)}
                  alt={movie.name}
               />
            ))}
         </div>
         {/* Render the trailer model if a trailer is selected */}
         {selectedTrailer && (
            <TrailerWindow
               videoId={selectedTrailer.key}
               onClose={handleCloseModel}
            />
         )}
      </div>
   );
}

export default Row;
