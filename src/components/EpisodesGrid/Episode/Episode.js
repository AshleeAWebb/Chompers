import React from 'react';
import '../Episode/Episode.css';
import { Link } from 'react-router-dom';

const Episode = ({ episodeImg, episodeId, episodeTitle }) => {
  return (
    <Link key={episodeId} to={`/${episodeId}`}>
      <img className="episode-img" src={episodeImg} id={episodeId} alt={episodeTitle} />
    </Link>
  );
};

export default Episode;

