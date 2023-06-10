describe('Error Handling', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.tvmaze.com/shows/5853/seasons', {
      statusCode: 500,
      body: 'Internal Server Error',
    }).as('getSeasons');

    cy.intercept('GET', 'https://api.tvmaze.com/seasons/139611/episodes', {
      statusCode: 500,
      body: 'Internal Server Error',
    }).as('getEpisodes');

    cy.intercept('GET', 'https://api.tvmaze.com/episodes/2359999', {
      statusCode: 500,
      body: 'Internal Server Error',
    }).as('getSingleEpisode');
  });

  it('displays error message on Home component when there is an error', () => {
    cy.visit('http://localhost:3000');
    cy.wait('@getSeasons');
    cy.get('.error-page').should('contain', 'Error: Just when you thought it was safe to surf the web... ');
  });

  it('displays error message on EpisodesGrid component when there is an error', () => {
    cy.visit('http://localhost:3000/episodes/139611');
    cy.wait('@getEpisodes');
    cy.get('.error-page').should('contain', 'Error: Just when you thought it was safe to surf the web... ');
  });

  it('displays error message on EpisodeDetail component when there is an error', () => {
    cy.visit('http://localhost:3000/episode/2359999');
    cy.wait('@getSingleEpisode');
    cy.get('.error-page').should('contain', 'Error: Just when you thought it was safe to surf the web... ');
  });

  // it('navigates to the error page when there is an error on episode grid', () => {
  //   cy.visit('http://localhost:3000/episodes/139611');
  //   cy.wait('@getEpisodes');
  //   cy.url().should('eq', 'http://localhost:3000/error');
  //   cy.get('.error-page').should('contain', 'Error: Just when you thought it was safe to surf the web... ');
  // });

  // it('navigates to the error page when there is an error on detailed episode', () => {
  //   cy.visit('http://localhost:3000/episode/2359999');
  //   cy.wait('@getSingleEpisode');
  //   cy.url().should('eq', 'http://localhost:3000/error');
  //   cy.get('.error-page').should('contain', 'Error: Just when you thought it was safe to surf the web... ');
  // });
});