const fetchEpisodes = (seasonId) => {
  return fetch(`https://api.tvmaze.com/seasons/${seasonId}/episodes`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Please try again, there is an error. Code: ${res.status}`);
      } else {
        return res.json();
      }
    });
};

const fetchSeasons = () => {
  return fetch(`https://api.tvmaze.com/shows/5853/seasons`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Please try again, there is an error. Code: ${res.status}`);
      } else {
        return res.json();
      }
    });
};

const fetchSingleEpisode = (episodeId) => {
  console.log('Fetching episode:', episodeId);
  return fetch(`https://api.tvmaze.com/episodes/${episodeId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Please try again, there is an error. Code: ${res.status}`);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log('Episode data:', data);
      return data;
    });
};


export { fetchEpisodes, fetchSeasons, fetchSingleEpisode};