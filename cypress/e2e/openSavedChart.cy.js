describe('Open Saved Chart', () => {
    it('should open the chart builder with the selected chart data', () => {
        cy.visit('/')

        // save a chart
        cy.findByRole('link', { name: 'Line' }).click()
        cy.findByLabelText('X label').type('x')
        cy.findByLabelText('Y label').type('y')
        cy.findByLabelText('Chart title').type('test chart')
        cy.findByLabelText('X').type('1')
        cy.findByLabelText('Y').type('2')
        cy.findByRole('button', { name: '+' }).click()
        cy.findByRole('button', { name: 'Generate chart' }).click()
        cy.findByRole('button', { name: 'Save chart' }).click()

        // navigate to gallery
        cy.findByRole('link', { name: 'Gallery' }).click()

        // find saved chart and open it
        cy.findByText('test chart').click()

        // verify chart title is the same as the one we saved
        cy.findByLabelText('Chart title').should('have.value', 'test chart')
    
    });
});