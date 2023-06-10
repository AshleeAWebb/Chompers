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
          season: episodesData.length > 0 ? episodesData[0].season : '',
        });
      })
      .catch((error) => {
        if (error instanceof Error) {
          this.setState({ error: 'Server error.' });
        } else {
          this.setState({ error: 'Unknown error.' });
        }
      });
  }

  limitedSeason() {
    const { episodes, season } = this.state;
    const hasDefaultImages = episodes.every(({ image }) => image === null || image === sharkDefault);
    if (!hasDefaultImages) {
      return null;
    }
    return (
      <div className="limitedDataWrapper">
        <div className="limitedDataMessage">
          <p>Limited data is available for episodes in Season {season}.</p>
          <p>
            Check out{' '}
            <a className="shark-week-url" href="https://www.discovery.com/shark-week">
              Shark Week
            </a>{' '}
            for more details!
          </p>
        </div>
      </div>
    );
  }

  render() {
    const { episodes, error, season } = this.state;
    const episodeCards = episodes.map(({ id, image, name, season, number }) => (
      <Episode
        episodeImg={image ? image.medium : sharkDefault}
        episodeId={id}
        key={id}
        episodeTitle={`${name} - Season ${season}, Episode ${number}`}
      />
    ));

    return (
      <div>
        {error ? (
          <Redirect to="/error" />
        ) : (
          <div>
            <div className="title">
              <h1>Season {season}</h1>
              {this.limitedSeason()}
            </div>
            <div className="episodeGrid">{episodeCards}</div>
          </div>
        )}
      </div>
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
