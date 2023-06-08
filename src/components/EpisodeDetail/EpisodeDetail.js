import React, { Component } from "react";
import '../EpisodeDetail/EpisodeDetail.css';
import PropTypes from 'prop-types';
import { fetchSingleEpisode } from "../Api/apiCalls";
import sharkDefault from '../../assets/sharkDefault.png';

function removeHtmlTags(htmlString) {
  const sanitizedString = htmlString.replace(/<\/?[^>]+(>|$)/g, "");
  return sanitizedString;
}

class EpisodeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: {
        name: "",
        season: "",
        airdate: "",
        runtime: "",
        image: "",
        summary: "",
        id: "",
      },
      error: '',
    };
  }

  componentDidMount() {
    this.getSingleEpisode();
  }

  getSingleEpisode() {
    const { id } = this.props;
    fetchSingleEpisode(id)
      .then((data) => {
        this.setState({
          episode: {
            name: data.name,
            season: data.season,
            airdate: data.airdate,
            runtime: data.runtime,
            image: data.image,
            summary: removeHtmlTags(data.summary),
            id: data.id,
          },
          error: '',
        });
      })
      .catch((error) => {
        if (error instanceof Error) {
          this.setState({ error: "Server error." });
        } else {
          this.setState({ error: "Unknown error." });
        }
      });
    }


getSharkMessage() {
  return (
    <div className="shark-message">
      <div className="shark-episode-details-info">
        <p>We're sorry, but information about this episode is not available.</p>
        <p>Swim on over to Discovery Channel and</p>
        <p>Check out</p>
         <a href="https://www.discovery.com/shark-week" target="_blank" rel="noopener noreferrer"> Shark Week </a>
         <p> for more exciting shark-related content!</p>
      </div>
    </div>
  );
}
 
  render() {
    const { episode } = this.state;
    const formattedAirdate = new Date(episode.airdate).toLocaleDateString();

    if (!episode.name && !episode.season && !episode.airdate && !episode.runtime && !episode.summary) {
      return this.getSharkMessage();
    }
    return (
      <div className="episode-details">
        <div className="episode-details-info">
        <h2 className="episode-name">{episode.name}</h2>
          <p>Season {episode.season}</p>
          <p className="time">{episode.runtime} Mintues</p>
          <p className="date">{formattedAirdate}</p>
          <p className="summary-detail">{episode.summary}</p>
        </div>
        <div className="episode-image-container">
          <img
            className="episode-image"
            src={episode.image ? episode.image.original : sharkDefault}
            alt={episode.name}
          />
          <p className="episode-url">
            For More Shark Week Information:  
            <a className="shark-week-url" href="https://www.discovery.com/shark-week" target="_blank" rel="noreferrer"> Click Here</a>
            </p>
        </div>
      </div>
    );
  }
}

export default EpisodeDetail;

EpisodeDetail.propTypes = {
  id: PropTypes.string.isRequired,
  episode: PropTypes.shape({
    name: PropTypes.string.isRequired,
    season: PropTypes.string.isRequired,
    airdate: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  showSummary: PropTypes.bool,
  onLoadComplete: PropTypes.func,
  defaultImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
};
