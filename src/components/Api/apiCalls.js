const fetchData = () => {
  return fetch('https://api.tvmaze.com/seasons/139611/episodes')
    .then(res => {
      if (!res.ok) {
        throw new Error(`Please try again, there is an error. Code: ${res.status}`);
      } else {
        return res.json();
      }
    });
};

export { fetchData};