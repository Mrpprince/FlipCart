const express=require('express');
const { signup, signin, } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validations/auth');
const router = express.Router();

router.post('/signup',validateSignupRequest,isRequestValidated,signup)
router.post('/signin', validateSigninRequest,isRequestValidated,signin)

// router.post('/profile',requireSignIn,(req,res)=>{
//     res.status(200).json({
//         message:"Hello Profile"
//     })
// })
module.exports = router;