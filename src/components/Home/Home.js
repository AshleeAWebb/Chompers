import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Home/Home.css';
import hero from '../../assets/hero.webp';
import { fetchEpisodes } from '../Api/apiCalls';
import { sharkFacts } from '../../assets/sharkFacts';
import grayscale from '../../assets/grayscale.svg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      error: '',
    };
  }

  componentDidMount() {
    const { seasons } = this.props;
    if (seasons.length > 0) {
      fetchEpisodes(seasons[0].id)
        .then((episodesData) => {
          this.setState({ episodes: episodesData });
        })
        .catch((error) => {
          this.setState({ error: error.message });
        });
    }
  }

  getRandomFact() {
    const randomIndex = Math.floor(Math.random() * sharkFacts.length);
    return sharkFacts[randomIndex];
  }

  render() {
    const { seasons } = this.props;
    const { episodes, error } = this.state;

    const sortedSeasons = [...seasons].sort((a, b) => b.number - a.number);

    return (
      <div className="home-container">
        <div className="hero-container">
          <img className="hero-img" src={hero} alt="Shark" />
        </div>
        <div className="content-container">
          <div className="font-container">
          <img className='grayscale' src={grayscale} alt="Chompers Logo" />
          <h1>Shark Facts</h1>
          <div className="quotes-container">
            <h3>{this.getRandomFact()}</h3>
            </div>
          </div>
          <div className="navbar">
            <div className="season-header">Season</div>
            <div className="seasons-list">
              {sortedSeasons.map((season) => (
                <Link key={season.id} to={`/episodes/${season.id}`} className="season-link">
                  {season.number}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

