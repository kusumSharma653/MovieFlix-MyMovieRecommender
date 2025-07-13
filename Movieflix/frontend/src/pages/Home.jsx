import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(response => setMovies(response.data.movies))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleSearch = () => {
    if (!selectedMovie) return;
    setLoading(true);
    axios.get(`http://localhost:5000/api/recommend?movie=${encodeURIComponent(selectedMovie)}`)
      .then(response => {
        setRecommendations(response.data.recommendations);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recommendations:', error);
        setRecommendations([]);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Hero />
      <div className="container mx-auto px-4 md:px-8 py-10">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Find Recommendations</h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center">
            <select
              className="bg-gray-800 text-white p-3 rounded-lg w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
            >
              <option value="">Select a movie</option>
              {movies.map((movie, index) => (
                <option key={index} value={movie}>{movie}</option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed w-full md:w-auto"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Recommendations'}
            </button>
          </div>
        </div>
        {recommendations.length > 0 && (
          <MovieRow title="Recommended Movies" movies={recommendations} />
        )}
      </div>
    </div>
  );
}

export default Home;