describe('data inputs stay populated while navigating pages', () => {
    it('passes', () => {
        cy.visit('/')
        // add some data to the values section
        cy.findByRole('link', { name: 'Line' }).click()
        cy.findByLabelText('X label').type('x')
        cy.findByLabelText('Y label').type('y')
        cy.findByLabelText('X').type('1')
        cy.findByLabelText('Y').type('2')
        cy.findByRole('button', { name: '+' }).click()
        cy.findByRole('link', { name: 'Bar' }).click()
        
        // there should be more than 2 'x-value' and 'y-value' labels
        cy.findAllByLabelText('X').should('have.length.greaterThan', 1)
        cy.findAllByLabelText('Y').should('have.length.greaterThan', 1)
        
    
    })
})

