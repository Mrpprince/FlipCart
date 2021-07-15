const express = require('express');
const { requireSignIn, adminMiddleWare } = require('../common-middleware/commonMiddleware');
const router = express.Router();
const { addCategory, getCategory } = require('../controller/category');
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
router.post('/category/create', requireSignIn, adminMiddleWare,upload.single('categoryImage'), addCategory)
router.get('/category/getCategory', getCategory)
module.exports = router;