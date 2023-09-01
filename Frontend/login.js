"use strict"
const loginForm=document.querySelector('.loginForm')
const userEmail=document.querySelector('.userEmail')
const userPassword=document.querySelector('.userPassword')
const signup=document.querySelector('.signin')
const resMessage=document.querySelector('.resMessage')

signup.addEventListener('click',()=>{
    window.location='./index.html'
})

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()


    axios.post('/user', {
        userName: userName.value,
        userEmail:userEmail.value,
        userPassword:confirmPassword.value,
      })
      .then((response) =>{
        console.log(response);
      })
      .catch((error) =>{
        console.log(error);
        resMessage.computedStyleMap.display="block"
        resMessage.textContent="Loggen in Successfully"
      })

})