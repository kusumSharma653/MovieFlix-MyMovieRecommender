import React from 'react';

function Navbar() {
  const scrollToMovies = () => {
    const moviesSection = document.getElementById('movies-section');
    if (moviesSection) {
      moviesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-10 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-red-600 text-3xl font-bold">MovieFlix</div>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-300">Home</a>
          <button
            onClick={scrollToMovies}
            className="text-white hover:text-gray-300"
          >
            Movies
          </button>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;