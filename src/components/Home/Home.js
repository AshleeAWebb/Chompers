import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
    this.getHomeInfo();
  }

  getHomeInfo() {
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

  renderHeroContainer() {
    return (
      <div className="hero-container">
        <img className="hero-img" src={hero} alt="Shark" />
      </div>
    );
  }

  renderFontContainer() {
    return (
      <div className="font-container">
        <img className="grayscale" src={grayscale} alt="Chompers Logo" />
        <h1>Shark Facts</h1>
        <div className="quotes-container">
          <h3>{this.getRandomFact()}</h3>
        </div>
      </div>
    );
  }

  renderSeasonLinks() {
    const { seasons } = this.props;
    const sortedSeasons = [...seasons].sort((a, b) => b.number - a.number);

    return sortedSeasons.map((season) => (
      <Link key={season.id} to={`/episodes/${season.id}`} className="season-link">
        {season.number}
      </Link>
    ));
  }

  render() {
    return (
      <div className="home-container">
        {this.renderHeroContainer()}
        <div className="content-container">
          {this.renderFontContainer()}
          <div className="navbar">
            <div className="season-header">Season</div>
            <div className="seasons-list">{this.renderSeasonLinks()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      number: PropTypes.number.isRequired,
    })
  ).isRequired,
};