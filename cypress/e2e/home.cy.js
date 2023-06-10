describe('Home', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.tvmaze.com/seasons/139611/episodes', {
      fixture: '2022.json', 
    }).as('getEpisodes');

    cy.intercept('GET', 'https://api.tvmaze.com/shows/5853/seasons', {
      fixture: 'seasons.json', 
    }).as('allSharkSeasons');

    cy.visit('http://localhost:3000'); 

    cy.wait('@allSharkSeasons');
  });

  it('displays the hero image', () => {
    cy.get('.hero-img').should('be.visible');
  });

  it('displays the shark facts', () => {
    cy.get('.quotes-container').should('be.visible');
    cy.get('.quotes-container h3').should('not.be.empty');
  });

  it('displays the seasons in the navbar', () => {
    cy.get('.season-link').should('have.length', 3);
    cy.get('.season-link').first().should('have.text', '2022');
    cy.get('.season-link').last().should('have.text', '1988');
  });

  it('navigates to episode page when a season link is clicked', () => {
    cy.get('.season-link').first().click();
    cy.url().should('include', '/episodes/139611'); 
  });
});
