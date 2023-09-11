const Router=require('express');
const { resetRequest, resetPassword } = require('../Controllers/resetContoller');

const resetRoute=Router()


resetRoute.post('/reset-password',resetRequest );

resetRoute.post('/reset-password/:token',resetPassword );

  
  module.exports={
    resetRoute
  }