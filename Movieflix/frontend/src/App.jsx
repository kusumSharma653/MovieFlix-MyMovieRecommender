import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MoviesSection from './pages/MoviesSection';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <MoviesSection/>
      
    </div>
  );
}

export default App;