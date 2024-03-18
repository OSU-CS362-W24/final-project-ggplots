describe('navigate to site home page', () => {
  it('passes', () => {
    cy.visit('/')
  })
})

describe('navigate to line chart page and buiid a successful line chart', () => {
  it('passes', () => {
    cy.visit('/')
    cy.findByRole('link', { name: 'Line' }).click()
    cy.findByLabelText('X label').type('x')
    cy.findByLabelText('Y label').type('y')
    cy.findByLabelText('X').type('1')
    cy.findByLabelText('Y').type('2')
    cy.findByRole('button', { name: '+' }).click()
    
    cy.findByRole('button', { name: 'Generate chart' }).click()

    // verify an image is in the dom
    cy.findByRole('img').should('exist')
  })
})


