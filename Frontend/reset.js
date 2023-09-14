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
       
        console.log(response)
       
responseMessage.textContent=response.data.message
responseMessage.style.display='block'
setTimeout(()=>{
    responseMessage.textContent=''
    resetForm.style.display='block'
    emailingForm.style.display='none'
},2000)
       
     
    

      
      })
      .catch((e) => {
        console.log(e);
      })

})

let code=''
resetCode.addEventListener('input',(e)=>{
    e.preventDefault()
code=resetCode.value
console.log(code)
})

resetForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(code !=''){
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
        responseMessage.textContent=response.data.message
    responseMessage.style.color="green"
     
    console.log(response.data)
         if(response.status==200){
       window.location.href='./login.html'
         }else {
            alert('Kindly enter the correct code')
         }
         
       
      })
      .catch((e) => {
        console.log(e);
      })
  
    } else{
        alert('kindly Enter your reset code')
    }

})