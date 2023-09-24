/// <reference types="cypress"/>

describe("Should enable user resetting password and redirect to login page",()=>{
    it("Should enable user to input email and send mail with the code",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/reset.html')

        cy.get('h1').should('exist')
        cy.get('h1').should('have.text','Reset Password')
        cy.get('.userEmail').type('davidmunyiri@gmail.com')
        cy.get('.signup').should('have.text','Send')
        cy.get('.signup').click()

        cy.get('.resetCode').type('126ABR')
        cy.get('.newPassword').type('34567892')
        cy.get('.login').should('have.text','Submit')
        cy.get('.login').click()

       // cy.url().should('include','/login.html')

    })
})