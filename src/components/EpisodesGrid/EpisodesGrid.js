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

  limititedSeason() {
    let message = null;
    const hasDefaultImages = this.state.episodes.every(({ image }) => image === null || image === sharkDefault);
    if (hasDefaultImages) {
      message = (
        <div className="limitedDataWrapper">
          <div className="limitedDataMessage">
            <p>Limited data is available for Season {this.state.season}.</p>
            <p>Check out Shark Week for more episodes!</p>
            <a href="https://www.discovery.com/shark-week">Shark Week</a>
          </div>
        </div>
      );
    }
    return message;
  }

  render() {
    const { episodes } = this.state;
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
        <div className="title">
          {<h1>Season {this.state.season}</h1>}
          {this.limititedSeason()}
        </div>
        <div className="episodeGrid">
          {episodeCards}
        </div>
      </>
    );
  }
}
export default EpisodesGrid;
