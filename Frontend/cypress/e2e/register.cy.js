/// <reference types="cypress"/>

describe("Enhances user regeistrationa nd redirect to login page",()=>{
    beforeEach(()=>{
        cy.visit('http://127.0.0.1:5500/Frontend/index.html')
    })

    it("displays the register page on load",()=>{
        cy.get('h3').should('exist')
        cy.get('h3').should('have.text','Join Linkups Today')
    })
})