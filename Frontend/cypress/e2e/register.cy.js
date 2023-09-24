/// <reference types="cypress"/>

describe("Enhances user regeistrationa and redirect to login page",()=>{
    beforeEach(()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/index.html')
    })

    it("displays the register page on load",()=>{
        cy.get('h3').should('exist')
        cy.get('h3').should('have.text','Join Linkups Today')
    })
    describe("Tests for user registration and login",()=>{
        it("Should register a new user and take him to login page",()=>{
            cy.visit('http://127.0.0.1:5501/Frontend/index.html')
            
            cy.get('.userName').type('david Munyiri')
            cy.get('.userEmail').type('davidmunyiri@gmail.com')
            cy.get('.userPassword').type('12345678')
            cy.get('.confirmPassword').type('12345678')
            cy.get('.signup').click()

        })
        
    })
    it("Should redirect to login page if the signin button is clicked",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/index.html')
        cy.get('p').should('exist')
        cy.get('.withAccount').should('have.text','Already have an account?')
        cy.get('.signin').should('have.text','Sign in')
        cy.get('.signin').click()
    })
})