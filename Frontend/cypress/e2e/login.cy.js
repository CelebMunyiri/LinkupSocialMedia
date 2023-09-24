/// <reference types="cypress"/>
describe("tests for login user",()=>{
 
    it("should redirect to reset password page",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/login.html')
        cy.get('a').should('have.text','Forgot Password')
        cy.get('a').click()

    })
    it("Should redirect to signup page if the button is clicked",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/login.html')

        cy.get('.signin').should('have.text','Sign Up')
        cy.get('.signin').click()
    })
    it("Should login a user and redirect to homepage",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/login.html')
        cy.get('h3').should('have.text','Resume to Linkups')

        cy.get('.userEmail').type('davidmunyiri2019@outlook.com')
        cy.get('.userPassword').type('12345678')
        cy.get('.signup').click()
        cy.url().should('not.include','/login.html')
        cy.url().should('include','/home.html')

        cy.get('.home').click()
        cy.get('h4')

    })
  
       it("Should enable user to see posts in the homepage",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/login.html')
        cy.get('h3').should('have.text','Resume to Linkups')

        cy.get('.userEmail').type('davidmunyiri2019@outlook.com')
        cy.get('.userPassword').type('12345678')
        cy.get('.signup').click()
        cy.url().should('contain','/home.html')

        cy.get('.post-body').should('exist')
        cy.get('.post-head').should('exist')
        cy.get('h4').should('exist')
        cy.get('.mail').should('exist')
        cy.get('.post-content').should('exist')
        cy.get('.content-part').should('exist')
       })

       it("Should show list of user when following button is clicked on the homepage",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/login.html')
        cy.get('h3').should('have.text','Resume to Linkups')

        cy.get('.userEmail').type('davidmunyiri2019@outlook.com')
        cy.get('.userPassword').type('12345678')
        cy.get('.signup').click()
        cy.url().should('contain','/home.html')

        cy.get('.showUsers').click()
        cy.get('.users').should('exist')
        cy.get('.chat-button').should('exist')
       })

       it("Should allow searching for posts or user",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/login.html')
        cy.get('h3').should('have.text','Resume to Linkups')

        cy.get('.userEmail').type('davidmunyiri2019@outlook.com')
        cy.get('.userPassword').type('12345678')
        cy.get('.signup').click()
        cy.url().should('contain','/home.html')

        cy.get('.explore').click()
        cy.get('.search').type('dawud')
       })
       it("Should display notifications of a user",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/login.html')
       

        cy.get('.userEmail').type('davidmunyiri2019@outlook.com')
        cy.get('.userPassword').type('12345678')
        cy.get('.signup').click()
        cy.url().should('contain','/home.html')

        cy.get('.notification').click()
        cy.get('.Notification').should('exist')
        cy.get('.notImg').should('exist')
cy.get('table').should('exist')
      })
      it("Should enable user to start a chat",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/login.html')
        cy.get('h3').should('have.text','Resume to Linkups')

        cy.get('.userEmail').type('davidmunyiri2019@outlook.com')
        cy.get('.userPassword').type('12345678')
        cy.get('.signup').click()
        cy.url().should('contain','/home.html')

        cy.get('.messages').click()
        cy.get('.DisplayMessaging').should('exist')
        cy.get('.messagePerson').should('exist').click()
        cy.get('.Messages').should('exist')
        cy.get('#message-input').type('Yoh ma nigga')


      })
      it("Should enable user to view his profile",()=>{
        cy.visit('http://127.0.0.1:5501/Frontend/login.html')
        

        cy.get('.userEmail').type('davidmunyiri2019@outlook.com')
        cy.get('.userPassword').type('12345678')
        cy.get('.signup').click()
        cy.url().should('contain','/home.html')

        cy.get('.profile').click()
        cy.get('.profileContent').should('exist')
        cy.get('.img').should('exist')
        cy.get('.userBio').should('exist')

        cy.get('.userPosts').click()
        cy.get('.post-body').should('exist')
        cy.get('.post-head').should('exist')

        cy.get('.userFollowers').click()
cy.get('.followers').should('exist')
cy.get('tr').should('exist')
        cy.get('.userFollowings').click()
        cy.get('.followers').should('exist')

      })
      

})