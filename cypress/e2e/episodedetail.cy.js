
describe('EpisodeDetail Component', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.tvmaze.com/seasons/139611/episodes', {
      fixture: '2022.json', 
    }).as('getEpisodes');

    cy.intercept('GET', 'https://api.tvmaze.com/shows/5853/seasons', {
      fixture: 'seasons.json', 
    }).as('allSharkSeasons');

    cy.intercept('GET', 'https://api.tvmaze.com/episodes/2359999',{
      fixture:'detailedEpisode.json',
    }).as('getSingleEpisode');
  });

  it('displays episode details when data is available', () => {
    cy.visit('localhost:3000/episode/2359999'); 
    cy.wait('@getSingleEpisode').then(() => {
      cy.get('.episode-name').should('contain', 'Dawn of the Monster Mako');
      cy.get('.time').should('contain', '41 Minutes');
      cy.get('.date').should('contain', '7/14/2022');
      cy.get('.summary-detail').should('contain', 'A 14-foot giant Mako shark is spotted in the waters off the Azores. Veteran underwater cinematographer Joe Romeiro and his wife, marine biologist and filmmaker Lauren Romeiro, search the teeming depths around the ancient island archipelago to capture the beast on film.');
    });
  });

  it('displays error message when there is an error fetching data', () => {
    cy.intercept('GET', 'https://api.tvmaze.com/episodes/2359999', {
      statusCode: 500,
      body: 'Internal Server Error',
    }).as('getSingleEpisode');
    cy.visit('localhost:3000/episode/2359999'); 
    cy.wait('@getSingleEpisode').then(() => {
    cy.get('.error-page').should('contain', 'Error: Just when you thought it was safe to surf the web... ');
    });
  });

  it('displays default message when episode data is not available', () => {
    cy.intercept('GET', 'https://api.tvmaze.com/episodes/2359999', {
      fixture: 'emptyEpisode.json', 
    }).as('getSingleEpisode');
    cy.visit('localhost:3000/episode/2359999'); 
    cy.wait('@getSingleEpisode').then(() => {
      cy.get('.shark-message').should('contain', "We're sorry, but information about this episode is not available.");
    });
  });
});