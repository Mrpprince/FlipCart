const express = require('express');
const { requireSignIn, userMiddleWare,  } = require('../common-middleware/commonMiddleware');
const { addItemToCart } = require('../controller/cart');
const router = express.Router();

router.post('/user/cart/addItemToCart',requireSignIn,userMiddleWare,addItemToCart)

module.exports = router;