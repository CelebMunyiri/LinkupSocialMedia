const express=require('express')
const mssql=require('mssql')

const app=express()

app.use(4600,()=>{
    console.log('server Running on port 4600')
})