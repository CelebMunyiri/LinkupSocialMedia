"use strict"
const signin=document.querySelector('.signin')

signin.addEventListener('click',function(e){
    e.preventDefault()
    window.location.href='./login.html'
    console.log('clicked again')
})

const registerForm=document.querySelector('.registerForm')
const userName=document.querySelector('.userName').value
const userEmail=document.querySelector('.userEmail').value
const userPassword=document.querySelector('.userPassword').value
const confirmPassword=document.querySelector('.confirmPassword').value

registerForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(userPassword===confirmPassword){

    // axios.post('/user', {
    //     userName: userName,
    //     userEmail:userEmail,
    //     userPassword:userPassword,
    //   })
    //   .then((response) =>{
    //     console.log(response);
    //   })
    //   .catch((error) =>{
    //     console.log(error);
    //   })
    console.log(userPassword,userEmail,userName,confirmPassword)
    }  else{
        alert('passwords do not match')
        confirmPassword='passwords do not match'
        confirmPassword.border='1px solid red'
    }

})