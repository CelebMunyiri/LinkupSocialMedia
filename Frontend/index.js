"use strict"
const signin=document.querySelector('.signin')
const registerForm=document.querySelector('.registerForm')
const userName=document.querySelector('.userName')
const resMessage=document.querySelector('.resMessage')
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


    axios.post('/user', {
        userName: userName.value,
        userEmail:userEmail.value,
        userPassword:confirmPassword.value,
      })
      .then((response) =>{
        console.log(response);
        resMessage.computedStyleMap.display="block"
        resMessage.textContent="Registered successfully"
      })
      .catch((error) =>{
        console.log(error);
      })

})