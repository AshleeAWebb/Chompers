describe('Home', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.tvmaze.com/seasons/139611/episodes', {
      fixture: '2022.json', 
    }).as('getEpisodes');

    cy.intercept('GET', 'https://api.tvmaze.com/shows/5853/seasons', {
      fixture: 'seasons.json', 
    }).as('allSharkSeasons');

    cy.visit('http://localhost:3000/episodes/139611'); 

    cy.wait('@getEpisodes');
  });
});