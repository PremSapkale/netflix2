import React, { useState, useEffect } from 'react';
import '../styles/Banner.css';
import axios from '../axios'; // Local axios file path
import requests from '../requests';

function Banner() {
   const [movie, setMovie] = useState([]);

   useEffect(() => {
      // Below function sets banner of random movie or web-series
      async function fetchData() {
         const request = await axios.get(requests.fetchNetflixOriginals);
         setMovie(
            request.data.results[
               Math.floor(Math.random() * request.data.results.length - 1)
            ]
         );
         return request;
      }
      fetchData();
   }, []);

   function truncate(str, n) {
      return str?.length > n ? str.substr(0, n - 1) + '...' : str;
   }

   return (
      <header
         className='banner'
         style={{
            backgroundSize: 'cover',
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: 'center center',
         }}
      >
         <div className='banner__content'>
            <h1 className='banner__title'>
               {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className='banner__buttons'>
               <button className='banner__button'>Play</button>
               <button className='banner__button'>My List</button>
            </div>
            <h1 className='banner__description'>
               {truncate(movie?.overview, 150)}
            </h1>
         </div>
         <div className='banner--fadeBottom' />
      </header>
   );
}

export default Banner;
