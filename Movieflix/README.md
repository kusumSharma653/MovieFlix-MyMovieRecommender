# Project1-Movie-Recommendation-System

A React-based movie and TV show recommendation system built with Vite, Tailwind CSS, and the TMDb API. This application features a responsive design with horizontal sliders for popular movies and TV shows, a hero section, and smooth navigation.

## Features

- **Hero Section**: Displays featured movies with auto-sliding banners.
- **Movies Section**: Horizontal slider showcasing popular movies with valid posters (up to 50 items).
- **Responsive Design**: Adjusts card count (2 mobile, 3 tablet, 4 desktop) with Tailwind CSS.
- **Smooth Navigation**: Navbar links scroll to Movies and TV Shows sections.
- **Performance**: Lazy-loaded images, skeleton loaders, and error fallbacks using `placehold.co`.
- **Vite Optimization**: Fast development and build process with modern JavaScript.

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **API**: TMDb API for movie and TV show data
- **Dependencies**: Axios, Tailwind CSS, PostCSS, Autoprefixer
- **Version Control**: Git, GitHub

## Prerequisites

- Node.js (v16.x or later)
- npm (v8.x or later)
- A TMDb API key (sign up at [TMDb](https://www.themoviedb.org/settings/api))

## Install Dependencies

npm install

## Configure Environment Variables

1. Create a .env file in the root directory.
2. Add your TMDb API key:

   VITE_TMDB_API_KEY=your_tmdb_api_key
   Replace your_tmdb_api_key with your actual TMDb API key.

## Start the Development Server

npm run dev

Open http://localhost:5173 in your browser to view the app.

## Contributing

1. Fork the repository.
2. Create a feature branch: git checkout -b feature-name.
3. Commit your changes: git commit -m "Add feature-name".
4. Push to the branch: git push origin feature-name.
5. Open a pull request on GitHub.

## Acknowledgement

1. TMDb API for movie and TV show data.
2. Vite for fast development.
3. Tailwind CSS for styling.
