
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Hero() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use environment variable for API key in production
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
          params: {
            api_key: TMDB_API_KEY,
            language: 'en-US',
            page: 1,
          },
        });
        const movies = response.data.results.slice(0, 5).map(movie => ({
          title: movie.title,
          overview: movie.overview,
          backdrop_path: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
            : 'https://placehold.co/1920x500?text=Featured+Movie',
        }));
        setFeaturedMovies(movies);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching featured movies:', error);
        setError('Failed to load featured movies. Please try again later.');
        setFeaturedMovies([{
          title: 'Featured Movie',
          overview: 'Discover the best movies recommended just for you!',
          backdrop_path: 'https://placehold.co/1920x500?text=Featured+Movie',
        }]);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Auto-cycle through movies every 5 seconds
  useEffect(() => {
    if (featuredMovies.length <= 1) return; // No cycling if 0 or 1 movie

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [featuredMovies]);

  if (isLoading) {
    return (
      <div className="relative h-[500px] bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-[80%] h-20 bg-gray-700 rounded mb-4"></div>
          <div className="w-[60%] h-10 bg-gray-700 rounded mb-4"></div>
          <div className="w-32 h-12 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-[500px] bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">{error}</p>
      </div>
    );
  }

  const currentMovie = featuredMovies[currentIndex];

  return (
    <div
      className="relative h-[500px] bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${currentMovie.backdrop_path})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{currentMovie.title}</h1>
          <p className="text-lg md:text-xl text-white mb-4 max-w-2xl">{currentMovie.overview}</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300">
            Watch Now
          </button>
        </div>
      </div>
      {/* Navigation dots for carousel */}
      {featuredMovies.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-gray-500'
              }`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hero;