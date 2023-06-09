import React, { Component } from "react";
import '../EpisodeDetail/EpisodeDetail.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { fetchSingleEpisode } from "../Api/apiCalls";
import sharkDefault from '../../assets/sharkDefault.png';
import { removeHtmlTags } from "../Api/utilities.js";

class EpisodeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: {
        id: "",
        url: "",
        name: "",
        season: "",
        number: "",
        airdate: "",
        runtime: "",
        image: "",
        summary: ""
      },
      error: ""
    };
  }

  componentDidMount() {
    this.getSingleEpisode();
  }

  getSingleEpisode() {
    const { id } = this.props;
    fetchSingleEpisode(id)
      .then((data) => {
        const episodeData = {
          id: data.id,
          url: data.url,
          name: data.name,
          season: data.season,
          number: data.number,
          airdate: data.airdate,
          runtime: data.runtime,
          rating: data.rating,
          image: data.image,
          summary: data.summary,
        };

        this.setState({
          episode: episodeData,
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
          <a href="https://www.discovery.com/shark-week" target="_blank" rel="noopener noreferrer">
            Shark Week
          </a>
          <p>for more exciting shark-related content!</p>
        </div>
      </div>
    );
  }

  render() {
    const { episode, error } = this.state;
    const formattedAirdate = episode.airdate ? new Date(episode.airdate).toLocaleDateString() : '';
    let summaryContent;
    if (episode.summary) {
      const sanitizedSummary = removeHtmlTags(episode.summary);
      summaryContent = <p className="summary-detail">{sanitizedSummary}</p>;
    } else {
      summaryContent = <p className="summary-detail">No summary available for this episode.</p>;
    }
    if (error) {
      return <Redirect to="/error" />;
    }
    if (!episode || !episode.name || !episode.season || !episode.airdate || !episode.runtime) {
      return this.getSharkMessage();
    }
    return (
      <div className="episode-details">
        <div className="episode-details-info">
          <h2 className="episode-name">{episode.name}</h2>
          <p>Season {episode.season}</p>
          <p className="time">Runtime: {episode.runtime} Minutes</p>
          <p className="date">Date Aired: {formattedAirdate}</p>
          {summaryContent}
        </div>
        <div className="episode-image-container">
          <img
            className="episode-image"
            src={episode.image ? episode.image.original : sharkDefault}
            alt={episode.name}
          />
          <p className="episode-url">
            For More Shark Week Information:
            <a className="shark-week-url" href="https://www.discovery.com/shark-week" target="_blank" rel="noreferrer">
              Click Here
            </a>
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
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    season: PropTypes.number.isRequired,
    number: PropTypes.number,
    airdate: PropTypes.string.isRequired,
    runtime: PropTypes.number.isRequired,
    image: PropTypes.shape({
      medium: PropTypes.string,
      original: PropTypes.string,
    }),
    summary: PropTypes.string,
    }),
  showSummary: PropTypes.bool,
  onLoadComplete: PropTypes.func,
  defaultImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
};