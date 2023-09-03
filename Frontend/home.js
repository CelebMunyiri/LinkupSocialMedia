"use strict"
const home=document.querySelector('.home')
const Home=document.querySelector('.Home')

home.addEventListener('click',()=>{
    Home.style.display='block'
    Explore.style.display='none'
})

const explore=document.querySelector('.explore')
const Explore=document.querySelector('.Explore')
explore.addEventListener('click',()=>{
    Explore.style.display='block'
    Home.style.display='none'
})

const notification=document.querySelector('.notification')
const Notification=document.querySelector('.Notification')

notification.addEventListener('click',()=>{
    Notification.style.display='block'
    Home.style.display='none'
    Explore.style.display='none'
})