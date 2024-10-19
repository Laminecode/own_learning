const express = require('express')
const router = express.Router()
const {adduser,verifyuser,FindByEmail} = require('../Controllers/user.js')
const {islogin,logout }= require('../middle_ware/islogin.js')

router.get('/islogin',islogin)
router.post('/logout',logout);
router.post('/signup',adduser)
router.post('/login',verifyuser)
router.post('/user',FindByEmail)


module.exports = router