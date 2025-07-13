import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard.jsx";

function MoviesSection() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(4);
  const sliderRef = useRef(null);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const MOVIES_PER_LOAD = 50;

  // Dynamic cards per slide based on screen size
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 640) setCardsPerSlide(2); // Mobile
      else if (window.innerWidth < 1024) setCardsPerSlide(3); // Tablet
      else setCardsPerSlide(4); // Desktop
    };
    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const fetchMovies = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const pagesNeeded = Math.ceil(MOVIES_PER_LOAD / 20);
      const requests = [];
      for (let i = 0; i < pagesNeeded; i++) {
        requests.push(
          axios.get(`${TMDB_BASE_URL}/movie/popular`, {
            params: {
              api_key: TMDB_API_KEY,
              language: "en-US",
              page: i + 1,
            },
          })
        );
      }
      const responses = await Promise.all(requests);
      const newMovies = responses
        .flatMap((response) => response.data.results)
        .slice(0, MOVIES_PER_LOAD)
        .map((movie) => ({
          title: movie.title,
          posterPath: movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://placehold.co/200x300?text=No+Image",
        }));

      setMovies(newMovies);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to load movies. Please try again later.");
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    fetchMovies(); // Initial fetch
  }, [fetchMovies]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < Math.ceil(movies.length / cardsPerSlide) - 1) {
      setCurrentIndex((prev) => prev + 1);
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="movies-section" className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-6">Popular Movies</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="relative">
        <button
          onClick={handlePrev}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition duration-300 shadow-lg z-10 ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentIndex === 0}
        >
          ←
        </button>
        <div
          ref={sliderRef}
          className="flex overflow-x-hidden space-x-4 snap-x snap-mandatory"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {movies.map((movie, index) => (
            <div key={`${movie.title}-${index}`} className="snap-start">
              <MovieCard title={movie.title} posterPath={movie.posterPath} />
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition duration-300 shadow-lg z-10 ${
            currentIndex >= Math.ceil(movies.length / cardsPerSlide) - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={
            currentIndex >= Math.ceil(movies.length / cardsPerSlide) - 1
          }
        >
          →
        </button>
      </div>
      {/* Slider dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {[...Array(Math.ceil(movies.length / cardsPerSlide))].map(
          (_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-red-600" : "bg-gray-500"
              }`}
              onClick={() => {
                setCurrentIndex(index);
                sliderRef.current.scrollTo({
                  left: index * sliderRef.current.offsetWidth,
                  behavior: "smooth",
                });
              }}
            ></button>
          )
        )}
      </div>
      {isLoading && (
        <div className="flex space-x-4 mt-4">
          {[...Array(cardsPerSlide)].map((_, index) => (
            <div
              key={index}
              className="relative w-48 h-72 bg-gray-700 rounded overflow-hidden animate-pulse flex-shrink-0"
            >
              <div className="w-full h-full bg-gray-600"></div>
              <div className="absolute bottom-0 w-full bg-black bg-opacity-75 p-2">
                <div className="h-4 bg-gray-500 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesSection;
