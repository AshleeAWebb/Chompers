import React from 'react';
import '../EpisodesGrid/EpisodesGrid.css';
import Episode from "../EpisodesGrid/Episode/Episode";


const EpisodesGrid = ({ episodes }) => {
  if (!episodes) {
    return null; 
  }

  const episodeCards = episodes.map(({ id, image, name, season, number }) => (
    <Episode
      episodeImg={image ? image.medium : ''}
      episodeId={id}
      key={id}
      episodeTitle={`${name} - Season ${season}, Episode ${number}`}
    />
  ));
  return <div className="episodeGrid">{episodeCards}</div>;
}



export default EpisodesGrid;
