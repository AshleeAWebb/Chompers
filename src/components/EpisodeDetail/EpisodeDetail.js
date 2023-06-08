import React, { Component } from "react";
import '../EpisodeDetail/EpisodeDetail.css';
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
  render() {
    const { episode } = this.state;

    return (
      <div className="episode-details">
        <div className="episode-card">
          <img
            className="episode-image"
            src={episode.image ? episode.image.original: sharkDefault}
            alt={episode.name}
          />
          <h2 className="episode-name">{episode.name}</h2>
        </div>
        <div className="right-side">
          <section className="prep-wrapper">
            <p className="summary-detail">{episode.summary}</p> 
          </section>
        </div>
      </div>
    );
  }
}

export default EpisodeDetail;
