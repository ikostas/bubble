describe('Search', () => {
  beforeEach(() => {
    cy.visit('/searchthenews');
  });

  it('should open search', () => {
    cy.get('h2').should('be.visible').and('have.text', 'Search the News');
  });

  it('search button should be on the page', () => {
    cy.get('input[type="submit"][value="Search"]').should('be.visible');
  });

  it('should show results on test search', () => {
    const searchQuery = 'Trump';
    cy.get('#search').type(searchQuery).should('have.value', searchQuery);

    cy.get('input[type="submit"][value="Search"]').click();

    cy.get('h4').should('have.length', 10);
  });
});

describe('Navigation', () => {
  it('should navigate to correct pages using navigation links', () => {
    cy.visit('/');

    cy.contains('a', 'Tag Cloud').should('be.visible').click();
    cy.url().should('include', '/tagcloud');

    cy.contains('a', 'Search the News').should('be.visible').click();
    cy.url().should('include', '/searchthenews');

    cy.contains('a', 'Top Headlines').should('be.visible').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });
});

