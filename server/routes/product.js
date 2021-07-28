const express = require('express');
const { requireSignIn, adminMiddleWare } = require('../common-middleware/commonMiddleware');
const { createProduct, getAllProductBySlug } = require('../controller/product');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid')
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '_' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/product/create', requireSignIn, adminMiddleWare, upload.array('productPicture'),createProduct)

router.get('/product/:slug',getAllProductBySlug)
// router.get('/category/getCategory', getCategory)
module.exports = router;