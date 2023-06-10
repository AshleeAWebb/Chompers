import React, { Component } from "react";
import '../EpisodeDetail/EpisodeDetail.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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
        id: "",
        url: "",
        name: "",
        season: "",
        number: "",
        type: "",
        airdate: "",
        airtime: "",
        airstamp: "",
        runtime: "",
        rating: {
          average: ""
        },
        image: "",
        summary: "",
        _links: {
          self: {
            href: ""
          },
          show: {
            href: ""
          }
        }
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
          type: data.type,
          airdate: data.airdate,
          airtime: data.airtime,
          airstamp: data.airstamp,
          runtime: data.runtime,
          rating: data.rating,
          image: data.image,
          summary: removeHtmlTags(data.summary),
          _links: data._links,
        };
  
        this.setState({
          episode: episodeData,
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
    const { error } = this.state;
  
    if (error) {
      return <Redirect to="/error" />;
    }
  
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
  const { episode } = this.state;
  console.log('Episode:', episode);
  console.log('Name:', episode.name);
  console.log('Season:', episode.season);
  console.log('Airdate:', episode.airdate);
  console.log('Runtime:', episode.runtime);

  const formattedAirdate = episode.airdate ? new Date(episode.airdate).toLocaleDateString() : '';

  if (!episode || !episode.name || !episode.season || !episode.airdate || !episode.runtime) {
    console.log('Showing Shark Message');
    return this.getSharkMessage();
  }

  return (
    <div className="episode-details">
      <div className="episode-details-info">
        <h2 className="episode-name">{episode.name}</h2>
        <p>Season {episode.season}</p>
        <p className="time">{episode.runtime} Minutes</p>
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
    type: PropTypes.string.isRequired,
    airdate: PropTypes.string.isRequired,
    airtime: PropTypes.string.isRequired,
    airstamp: PropTypes.string.isRequired,
    runtime: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      average: PropTypes.number,
    }),
    image: PropTypes.shape({
      medium: PropTypes.string,
      original: PropTypes.string,
    }),
    summary: PropTypes.string,
    _links: PropTypes.shape({
      self: PropTypes.shape({
        href: PropTypes.string,
      }),
      show: PropTypes.shape({
        href: PropTypes.string,
      }),
    }),
  }),
  showSummary: PropTypes.bool,
  onLoadComplete: PropTypes.func,
  defaultImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
};