it('inputs change the shadow', ()=> {
    cy.visit('http://localhost:7000');
    cy.get('ul').find('a:first')
    .next().click()
    cy.get('#log-wrapper')
    .find('input:first')
    .type('mycypress@test.com')
    .next().type('mytest')
    .next()
    .click()
    cy.get('#ske-projects-display:first')
    .click()
    cy.get('.shape_709:first')
    .click({force: true})
    // cy.get('#shadows-plus')
    // .click()
    cy.get('#h-offset')
    .click()
    .type('4' + "{enter}")
    cy.get('#v-offset')
    .click()
    .type('4' + "{enter}")
    cy.get('#shadowBlur')
    .click()
    .type('4' + "{enter}")
    cy.get('#shadowSpread')
    .click()
    .type('4' + "{enter}")
    cy.get('.shape_709:first')
    .should('have.css', 'boxShadow')
    .and('match', /rgb\(0, 0, 0\) 24px 24px 24px 24px/)

})