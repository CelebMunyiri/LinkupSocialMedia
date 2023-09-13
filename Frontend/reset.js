"use strict"
const responseMessage=document.querySelector('.resMessage')
const resetForm=document.querySelector('.resetForm')
const emailingForm=document.getElementById('emailForm')
const resetEmail=document.querySelector('.userEmail')
const resetCode=document.querySelector('.resetCode')
const newPassword=document.querySelector('.newPassword')

emailingForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    axios
    .post(
        "http://localhost:4600/reset/reset-password",

        { 
          userEmail: resetEmail.value,
        },

        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
       
       // console.log(response)
       setTimeout(()=>{
        responseMessage.textContent=response.data
        responseMessage.style.color="green"
       },3000)
     resetForm.style.display='block'
     emailingForm.style.display='none'

      
      })
      .catch((e) => {
        console.log(e);
      })

})

let code=''
resetCode.addEventListener('onchange',()=>{
code=resetCode.value
console.log(code)
})

resetForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    axios
    .post(
        `http://localhost:4600/reset/reset-password/${code}`,
  
        { 
          newPassword:newPassword.value
        },
  
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        
        console.log(response)
        responseMessage.textContent=response.data
    responseMessage.style.color="green"
     
         setTimeout(()=>{
           console.log(response.data);
         
           responseMessage.textContent=res.data.resMessage
           
         },3500)
         window.location.href='./login.html'
       
      })
      .catch((e) => {
        console.log(e);
      })
  
  

})