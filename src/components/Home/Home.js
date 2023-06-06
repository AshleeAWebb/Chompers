import React from 'react';
import { Link } from 'react-router-dom';
import '../Home/Home.css';
import hero from '../../assets/hero.webp';
import { sharkFacts } from '../../assets/sharkFacts';

const Home = () => {
  const seasons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * sharkFacts.length);
    return sharkFacts[randomIndex];
  };

  return (
    <div className="home-container">
      <div className="hero-container">
        <img className="hero-img" src={hero} alt="Shark" />
      </div>
      <div className="content-container">
        <div className="quote-container">
          <h2>Shark Fact:</h2>
          <h3>{getRandomFact()}</h3>
        </div>
        <div className="navbar">
          <div className="season-header">
            Season
          </div>
          <div className="seasons-list">
            {seasons.map((season) => (
              <Link key={season} to={`${season}/season`} className="season-link">
                {season}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

