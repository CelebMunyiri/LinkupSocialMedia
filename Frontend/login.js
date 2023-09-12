"use strict"
const loginForm=document.querySelector('.loginForm')
const userEmail=document.querySelector('.userEmail')
const userPassword=document.querySelector('.userPassword')
const signup=document.querySelector('.signin')
const resMessage=document.querySelector('.resMessage')

signup.addEventListener('click',()=>{
    window.location='./index.html'
})

let tokenToUse=''
let UserID=''
let UserBio=''
let UserProfile=''
let Username=''
let Email=''
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()


    axios
    .post('http://localhost:4600/user/login', {
        Email:userEmail.value,
        PasswordHash:userPassword.value,
      },{
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) =>{
        console.log(res);
       
        tokenToUse=res.data.token
        localStorage.setItem('tokenToUse',tokenToUse)

        UserBio=res.data.UserBio
        localStorage.setItem('UserBio',UserBio)

        UserID=res.data.UserID
        localStorage.setItem('UserID',UserID)

        UserProfile=res.data.UserProfile
        localStorage.setItem('UserProfile',UserProfile)

        Email=res.data.Email
        localStorage.setItem('Email',Email)

        Username=res.data.Username
        localStorage.setItem('Username',Username)
        
        resMessage.style.display="block"
        resMessage.textContent="Logged in Successfully"
        window.location.href='./home.html'
      })
      .catch((error) =>{
        console.log(error);
        
      })

})