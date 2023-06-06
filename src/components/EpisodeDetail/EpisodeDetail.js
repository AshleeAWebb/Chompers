import React, { Component } from 'react';
import '../EpisodesDetail/EpisodesDetail.css';
import { Link } from 'react-router-dom';

class EpisodesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="episodes-detail">
        {this.props.episodes.map((episode) => (
          <Link key={episode.id} to={`${episode.id}/episodes`}>
            <div className="episodes-detail-item">
              <img src={episode.image} alt={episode.title} />
              <h3>{episode.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default EpisodesDetail;