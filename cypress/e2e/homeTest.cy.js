/* eslint-disable cypress/no-unnecessary-waiting */
describe('Marvel Characters Page Test', () => {
  it('should load the Marvel Home page', () => {
    // Visit the Marvel Characters page
    cy.visit('https://verribeiro.github.io/marvel-characters/');

    // Assert that the page title should contain "Marvel Characters"
    cy.get('[data-testid="cypress-title"]').should('exist').should('have.text', 'EXPLORE O UNIVERSO');
  });

  it('should load the Marvel Home page and favorite a character', () => {
    // Visit the Marvel Characters page
    cy.visit('https://verribeiro.github.io/marvel-characters/');

    // Wait for a moment to allow page content to load
    cy.wait(1000);
    // Find and click on the favorite button from the first character
    cy.get('.favoriteThumbnailButton').first().click();

    cy.wait(1000);

    // Find and click on the show only favorites characters
    cy.get('.showFavoritesButton').click();
    cy.wait(1000);

    // Assert that the character details are displayed
    cy.get('.resultQuantityText').should('have.text', 'Encontrados 1 heróis');
  });

  it('should load the Marvel Home Page and navigate to CharactersProfile page', () => {
    // Visit the Marvel Characters page
    cy.visit('https://verribeiro.github.io/marvel-characters/');

    // Find and click on the first search result
    cy.get('a').first().click();

    // Assert that the character details are displayed
    cy.get('.characterProfileContainer').should('be.visible');
  });

  it('should load the Marvel Home Page and navigate to CharactersProfile page', () => {
    // Visit the Marvel Characters page
    cy.visit('https://verribeiro.github.io/marvel-characters/');
    cy.wait(1000);

    // Find the search input field and type a character name
    cy.get('input[type="text"]').type('Spider-Man{enter}');
    // cy.get('.searchIconButton').click();
    // Wait for a moment to allow search results to load
    cy.wait(1000);

    // Find a Spider-man result
    cy.get('.characterName').first().should('exist').should('have.text', 'Spider-Man (1602)');

    // Find and click on the first search result
    cy.get('a').first().click();

    // Assert that the character details are displayed
    cy.get('.characterProfileContainer').should('be.visible');
  });

  it('should load the Marvel Home Page and navigate to CharactersProfile page and favorite the character', () => {
    // Visit the Marvel Characters page
    cy.visit('https://verribeiro.github.io/marvel-characters/');
    cy.wait(1000);

    // Find the search input field and type a character name
    cy.get('input[type="text"]').type('Spider-Man{enter}');
    cy.get('.searchIconButton').click();
    // Wait for a moment to allow search results to load
    cy.wait(1000);

    // Find a Spider-man result
    cy.get('.characterName').first().should('exist').should('have.text', 'Spider-Man (1602)');

    // Find and click on the first search result
    cy.get('a').first().click();

    // Assert that the character details are displayed
    cy.get('.characterProfileContainer').should('be.visible');

    // Find and click on the favorite button from the character
    cy.get('.favoriteThumbnailButton').click();

    // find and click on the header to be redirected to Home page
    cy.get('a').first().click();

    cy.get('.showFavoritesButton').click();

    // Assert that the character found are displayed
    cy.get('.resultQuantityText').should('have.text', 'Encontrados 1 heróis');

    // Find a Spider-man result
    cy.get('.characterName').first().should('exist').should('have.text', 'Spider-Man (1602)');
  });
});
