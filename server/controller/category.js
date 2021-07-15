const slugify = require('slugify');
const Category = require('../models/category')

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)

    }
    else {
        category = categories.filter(cat => cat.parentId == parentId)

    }

    for (cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCategories(categories, cat._id)
        })
    }
    return categoryList;
}

exports.addCategory = (req, res) => {
    
    
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),

    }
    if (req.file){
        categoryObj.categoryImage=process.env.API +'/public/'+ req.file.filename
    }
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj)
    cat.save((error, cat) => {
        if (error) {
            return res.status(401).json({ error })
        }
        if (cat) {
            return res.status(201).json({ cat })
        }
    })
}

exports.getCategory = (req, res) => {
    Category.find({})
        .exec((error, categories) => {
            if (error) {
                return res.status(401).json({ error })
            }
            if (categories) {

                const categoryList = createCategories(categories)

                return res.status(201).json({ categoryList })
            }
        })
}