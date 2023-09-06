"use strict"
const home=document.querySelector('.home')
const Home=document.querySelector('.Home')

home.addEventListener('click',()=>{
    Home.style.display='block'
    Explore.style.display='none'
    messagePeople.style.display='none'
    Messages.style.display='none'
    Notification.style.display='none'
})

const explore=document.querySelector('.explore')
const Explore=document.querySelector('.Explore')
explore.addEventListener('click',()=>{
    Explore.style.display='block'
    Home.style.display='none'
    messagePeople.style.display='none'
    Messages.style.display='none'
    Notification.style.display='none'
})

const notification=document.querySelector('.notification')
const Notification=document.querySelector('.Notification')

notification.addEventListener('click',()=>{
    Notification.style.display='block'
    Home.style.display='none'
    Explore.style.display='none'
    messagePeople.style.display='none'
    Messages.style.display='none'
})

const Messages=document.querySelector('.Messages')
const messagingBtn=document.querySelector('.messages')
const messagePeople=document.querySelector('.DisplayMessaging')
const messagingContainer=document.querySelectorAll('.messagePerson')

messagingBtn.addEventListener('click',()=>{
    messagePeople.style.display='block'
    Explore.style.display='none'
    Home.style.display='none'
    Notification.style.display='none'
    Messages.style.display='none'
})

messagingContainer.forEach(element => {
    element.addEventListener('click',()=>{
        Messages.style.display='block'
        messagePeople.style.display='none'
        
    })
});

const BacktoMessages=document.querySelector('.backMessages')

BacktoMessages.addEventListener('click',()=>{
    messagePeople.style.display='block'
    Explore.style.display='none'
    Home.style.display='none'
    Notification.style.display='none'
    Messages.style.display='none'
})

const backToHome=document.querySelectorAll('.backHome')

backToHome.forEach(btn=>{
    btn.addEventListener('click',()=>{
    messagePeople.style.display='none'
    Explore.style.display='none'
    Home.style.display='block'
    Notification.style.display='none'
    Messages.style.display='none'
    profileContent.style.display='none'
})
})

const PostingDiv=document.querySelector('.PostingDiv')
const closePost=document.querySelector('.closePost')

closePost.addEventListener('click',()=>{
PostingDiv.style.display='none'
Home.style.display='block'
})

const postButton=document.querySelector('.post')

postButton.addEventListener('click',()=>{
    PostingDiv.style.display='block'
    messagePeople.style.display='none'
    Explore.style.display='none'
    Home.style.display='none'
    Notification.style.display='none'
    Messages.style.display='none'
})

const profileButton=document.querySelectorAll('.profile')
const profileContent=document.querySelector('.profileContent')

profileButton.forEach(btn=>{
    btn.addEventListener('click',()=>{
    profileContent.style.display='block'
    PostingDiv.style.display='none'
    messagePeople.style.display='none'
    Explore.style.display='none'
    Home.style.display='none'
    Notification.style.display='none'
    Messages.style.display='none'
    })
})