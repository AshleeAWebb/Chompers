import React, { Component } from 'react';
import '../Episode/Episode.css';
import { Link } from 'react-router-dom';
import fin from '../../../assets/fin.svg';

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false
    };
  }

  componentDidMount() {
    const { episodeId } = this.props;
    const isEpisodeFavorite = localStorage.getItem(episodeId);
    if (isEpisodeFavorite) {
      this.setState({ isFavorite: true });
    }
  }

  handleFinClick = () => {
    const { episodeId } = this.props;
    const { isFavorite } = this.state;
    this.setState({ isFavorite: !isFavorite });
    if (!isFavorite) {
      localStorage.setItem(episodeId, 'true');
    } else {
      localStorage.removeItem(episodeId);
    }
  };

  render() {
    const { episodeImg, episodeId, episodeTitle } = this.props;
    const { isFavorite } = this.state;

    return (
      <div className='wrapper'>
        <div className={`polaroid${isFavorite ? ' favorite' : ''}`}>
        <Link className="link" key={episodeId} to={`/episode/${episodeId}`}>
            <img className="episode-img" src={episodeImg} id={episodeId} alt={episodeTitle} />
            <p className="episode-title">{episodeTitle}</p>
          </Link>
          <div className="fin-button-container" onClick={this.handleFinClick}>
            {isFavorite ? <span className="fin-text">Fin</span> : null}
            <img className="fin-button" src={fin} alt="fin" />
            {isFavorite ? <span className="favorite-text">vorite</span> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Episode;
