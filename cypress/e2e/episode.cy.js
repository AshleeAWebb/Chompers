describe('Episode Card', () => {
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

  it('should display the first episode details correctly', () => {
    cy.get('.episode-img')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].src).to.include("https://static.tvmaze.com/uploads/images/medium_landscape/417/1043298.jpg");
      });
    cy.get('.episode-title')
      .should('be.visible')
      .and('contain.text', 'Dawn of the Monster Mako');
    cy.get('.fin-button').should('be.visible');
  });

  it('should be favorited and remain favorited on reload', () => {
    cy.get('.fin-button-container').eq(2).click();
    cy.get('.polaroid.favorite').should('exist');
    cy.reload();
    cy.get('.polaroid.favorite').should('exist');
    cy.get('.fin-button-container').eq(2).click();
    cy.get('.polaroid.favorite').should('not.exist');
    cy.reload();
    cy.get('.polaroid.favorite').should('not.exist');
  });


  it('should display the default image when episode image does not exist', () => {
    cy.intercept('GET', 'https://api.tvmaze.com/seasons/139611/episodes', {
      fixture: 'episodes_no_image.json',
    }).as('getEpisodes');
    cy.reload();
    cy.wait('@getEpisodes');
    cy.get('.episode-img')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].src).to.include('static/media/sharkDefault.24c1090fd67a1f5214cb.png');
      });
  });
});


