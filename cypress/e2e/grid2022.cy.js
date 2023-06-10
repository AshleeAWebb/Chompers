describe('2022 Grid', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.tvmaze.com/seasons/139611/episodes', {
      fixture: '2022.json',
    }).as('getGrid2022');

    cy.intercept('GET', 'https://api.tvmaze.com/shows/5853/seasons', {
      fixture: 'seasons.json',
    }).as('allSharkSeasons');

    cy.visit('http://localhost:3000/episodes/139611');

    cy.wait('@getGrid2022');
  });

  it('displays the correct season title', () => {
    cy.get('.title h1').should('have.text', 'Season 2022');
  });

  it('displays episode cards with episode images and titles', () => {
    cy.get('.episodeGrid')
      .find('.wrapper')
      .should('have.length', 3);
    cy.get('.episodeGrid')
      .find('.episode-img')
      .should('have.length', 3);
    cy.get('.episodeGrid')
      .find('.episode-title')
      .should('have.length', 3)
      .each(($title, index) => {
        cy.wrap($title).should('contain.text', `Episode ${index + 1}`);
      });
  });

  it('should not displays a limited data message for episodes without default images', () => {
    cy.get('.limitedDataMessage').should('not.exist');
  });

  it('navigates back to the grid when the browser back button is clicked', () => {
    cy.visit('localhost:3000/');
    cy.wait('@allSharkSeasons');
    cy.get('.season-link').first().should('have.text', '2022').first().click();
    cy.wait('@getGrid2022');
    cy.go('back');
    cy.url().should('eq', 'http://localhost:3000/');
  });
});