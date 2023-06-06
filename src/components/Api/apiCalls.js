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

export { fetchEpisodes, fetchSeasons };