import React, { useState } from 'react';
import '../Episode/Episode.css';
import { Link } from 'react-router-dom';
import fin from '../../../assets/fin.svg';

const Episode = ({ episodeImg, episodeId, episodeTitle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFinClick = () => {
    setIsFavorite(true);
  };

  return (
    <>
    <Link className="link" key={episodeId} to={`/${episodeId}`}>
      <div className={`polaroid${isFavorite ? ' favorite' : ''}`}>
        <img className="episode-img" src={episodeImg} id={episodeId} alt={episodeTitle} />
        <p className="episode-title">{episodeTitle}</p>
        </Link>
        <img className="fin-button" src={fin} alt="fin" onClick={handleFinClick} />
      </div>
      </>
  );
};

export default Episode;