import React, { useState } from 'react';
import '../Episode/Episode.css';
import { Link } from 'react-router-dom';
import fin from '../../../assets/fin.svg';

const Episode = ({ episodeImg, episodeId, episodeTitle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFinClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className='wrapper'>
      <div className={`polaroid${isFavorite ? ' favorite' : ''}`}>
        <Link className="link" key={episodeId} to={`/${episodeId}`}>
          <img className="episode-img" src={episodeImg} id={episodeId} alt={episodeTitle} />
          <p className="episode-title">{episodeTitle}</p>
        </Link>
        <div className="fin-button-container" onClick={handleFinClick}>
          {isFavorite ? <span className="fin-text">Fin</span> : null}
          <img className="fin-button" src={fin} alt="fin" />
          {isFavorite ? <span className="favorite-text">vorite</span> : null}
        </div>
      </div>
    </div>
  );
};

export default Episode;
