describe('2004 Grid', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.tvmaze.com/seasons/17523/episodes', {
      fixture: '2004.json',
    }).as('getGrid2004.json');

    cy.intercept('GET', 'https://api.tvmaze.com/shows/5853/seasons', {
      fixture: 'seasons.json',
    }).as('allSharkSeasons');

    cy.visit('http://localhost:3000/episodes/17523');

    cy.wait('@getGrid2004.json');
  });

  it('displays the correct season title', () => {
    cy.get('.title h1').should('have.text', 'Season 2004');
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
    cy.get('.limitedDataMessage').should('exist');
    cy.get('.limitedDataMessage')
      .find('p')
      .should('have.length', 2)
      .first()
      .should('contain.text', 'Limited data is available for episodes in Season 2004.');
    cy.get('.limitedDataMessage')
      .find('p')
      .last()
      .should('contain.text', 'Check out Shark Week for more details!')
      .find('a')
      .should('have.attr', 'href', 'https://www.discovery.com/shark-week');
  });

  it('navigates back to the grid when the browser back button is clicked', () => {
    cy.visit('localhost:3000/');
    cy.wait('@allSharkSeasons');
    cy.get('.season-link').eq(1).should('have.text', '2004').click();
    cy.wait('@getGrid2004.json');
    cy.go('back');
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
