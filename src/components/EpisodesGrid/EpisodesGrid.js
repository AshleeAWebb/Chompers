import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEpisodes } from '../Api/apiCalls';
import Episode from '../EpisodesGrid/Episode/Episode';
import '../EpisodesGrid/EpisodesGrid.css';
import sharkDefault from '../../assets/sharkDefault.png';

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

  render() {
    const { episodes, season } = this.state;

    const episodeCards = episodes.map(({ id, image, name, season, number }) => (
      <Episode
        episodeImg={image ? image.medium : sharkDefault}
        episodeId={id}
        key={id}
        episodeTitle={`${name} - Season ${season}, Episode ${number}`}
      />
    ));

    return (
      <div className='wrapper'>
      <div className="title">
         {<h1>Season {season}</h1>}
      </div>
      <div className="episodeGrid">
        {episodeCards}
      </div>
      </div>
    )
  }
}

export default EpisodesGrid;

