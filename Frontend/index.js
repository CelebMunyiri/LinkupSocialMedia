"use strict"
const signin=document.querySelector('.signin')
const registerForm=document.querySelector('.registerForm')
const userName=document.querySelector('.userName')
const userEmail=document.querySelector('.userEmail')
const resMessage=document.querySelector('.resMessage')
const userPassword=document.querySelector('.userPassword')
const confirmPassword=document.querySelector('.confirmPassword')
const passwordMismatchMessage = document.getElementById('password-mismatch');

signin.addEventListener('click',function(e){
    e.preventDefault()
    window.location.href='./login.html'
    console.log('clicked again')
})

confirmPassword.addEventListener('input', () => {
    if (userPassword.value !== confirmPassword.value) {
      confirmPassword.classList.add('password-mismatch');
      passwordMismatchMessage.textContent = 'Password does not match the first password';
    } else {
      confirmPassword.classList.remove('password-mismatch');
      passwordMismatchMessage.textContent = '';
    }
  });

  
  
registerForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(userName.value!='' && userEmail.value!='' && confirmPassword.value!='' ){

    axios.post('http://localhost:4600/user/register',
     {
        Username: userName.value,
        Email:userEmail.value,
        PasswordHash:confirmPassword.value,
      },{
        headers: {
          "Content-type": "application/json",
        },
      }
      )
      .then((response) =>{
        console.log(response);
        resMessage.style.display="block"
        resMessage.textContent="Registered successfully"
window.location.href='/Frontend/login.html'
      }
      )
      .catch((error) =>{
        console.log(error);
      })
    } else{
      alert('All filed must be filled be submmiting form')
    }
})