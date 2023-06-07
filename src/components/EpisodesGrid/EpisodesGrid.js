import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEpisodes } from '../Api/apiCalls';
import Episode from '../EpisodesGrid/Episode/Episode';
import '../EpisodesGrid/EpisodesGrid.css';

class EpisodesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      error: '',
    };
  }

  componentDidMount() {
    const { seasonId } = this.props.match.params;
    fetchEpisodes(seasonId)
      .then((episodesData) => {
        this.setState({ episodes: episodesData });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { episodes } = this.state;

    const episodeCards = episodes.map(({ id, image, name, season, number }) => (
      <Episode
        episodeImg={image ? image.medium : ''}
        episodeId={id}
        key={id}
        episodeTitle={`${name} - Season ${season}, Episode ${number}`}
      />
    ));

    return <div className="episodeGrid">{episodeCards}</div>;
  }
}

export default EpisodesGrid;
