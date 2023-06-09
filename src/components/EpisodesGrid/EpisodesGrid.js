import React, { Component } from 'react';
import { fetchEpisodes } from '../Api/apiCalls';
import { Redirect } from 'react-router-dom';
import Episode from '../EpisodesGrid/Episode/Episode';
import '../EpisodesGrid/EpisodesGrid.css';
import sharkDefault from '../../assets/sharkDefault.png';
import PropTypes from 'prop-types';

class EpisodesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      error: '',
      season: '',
    };
  }

  componentDidMount() {
    const { seasonId } = this.props.match.params;
    fetchEpisodes(seasonId)
      .then((episodesData) => {
        this.setState({
          episodes: episodesData,
          season: episodesData.length > 0 ? episodesData[0].season : null
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  limititedSeason() {
    const hasDefaultImages = this.state.episodes.every(({ image }) => image === null || image === sharkDefault);
    if (!hasDefaultImages) {
      return null; } 
      return (
        <div className="limitedDataWrapper">
          <div className="limitedDataMessage">
            <p>Limited data is available for episodes in Season {this.state.season}.</p>
            <p>Check out <a className="shark-week-url" href="https://www.discovery.com/shark-week">Shark Week</a> for more details!</p>
          </div>
        </div>
      );
    }

  render() {
    const { episodes, error } = this.state;
    const episodeCards = episodes.map(({ id, image, name, season, number }) => (
      <Episode
        episodeImg={image ? image.medium : sharkDefault}
        episodeId={id}
        key={id}
        episodeTitle={`${name} - Season ${season}, Episode ${number}`}
      />
    ));

    return (
      <>
        {error ? (
          <Redirect to="/error" />
        ) : (
          <>
            <div className="title">
              <h1>Season {this.state.season}</h1>
              {this.limititedSeason()}
            </div>
            <div className="episodeGrid">
              {episodeCards}
            </div>
          </>
        )}
      </>
    );
  }
}


export default EpisodesGrid;

EpisodesGrid.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      seasonId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
