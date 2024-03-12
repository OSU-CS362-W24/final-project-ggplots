
describe('Save chart to gallery', () => {
    it('saves a chart and verify its entry into the gallery', () => {
        cy.visit('/')
        // make a new chart
        cy.findByRole('link', { name: 'Line' }).click()
        cy.findByLabelText('X label').type('x')
        cy.findByLabelText('Y label').type('y')
        // add a chart title
        cy.findByLabelText('Chart title').type('test chart')
        cy.findByLabelText('X').type('1')
        cy.findByLabelText('Y').type('2')
        cy.findByRole('button', { name: '+' }).click()
        cy.findByRole('button', { name: 'Generate chart' }).click()

        // save and navigate to gallery
        cy.findByRole('button', { name: 'Save chart' }).click()
        cy.findByRole('link', { name: 'Gallery' }).click()
        
        // verify the chart is in the gallery has the same title as the one we saved
        cy.findByText('test chart').should('exist')
        
    })
})


