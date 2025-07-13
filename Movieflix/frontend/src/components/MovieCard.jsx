
import React, { useState, useEffect } from 'react';

function MovieCard({ title }) {
  const [posterPath, setPosterPath] = useState(null);

  useEffect(() => {
    const fetchMoviePoster = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=f8bac125818393a0076394fa32232ec7&query=${encodeURIComponent(title)}`
        );
        const data = await response.json();
        if (data.results && data.results[0]?.poster_path) {
          setPosterPath(`https://image.tmdb.org/t/p/w200${data.results[0].poster_path}`);
        } else {
          setPosterPath('https://placehold.co/200x300?text=No+Image'); // Fallback
        }
      } catch (error) {
        console.error('Error fetching movie poster:', error);
        setPosterPath('https://placehold.co/200x300?text=Error'); // Fallback
      }
    };

    fetchMoviePoster();
  }, [title]);

  return (
    <div className="relative w-48 h-72 bg-gray-800 rounded overflow-hidden transform transition duration-300 hover:scale-105">
      <img
        src={posterPath || 'https://placehold.co/200x300?text=Loading'}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 w-full bg-black bg-opacity-75 p-2">
        <h3 className="text-white text-sm font-semibold">{title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;