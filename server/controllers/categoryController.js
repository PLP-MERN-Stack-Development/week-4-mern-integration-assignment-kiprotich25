const Category = require ('../models/Category');

exports.getCategories = async (req, res, next ) => {
    try {
        const categories = await Category.find()
        res.json(categories)
        
    } catch (error) {
        next(error)
        
    }
};

exports.createCategory = async (req, res, next ) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category)
        
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({message: "CAtegory already exists"});

           
        }
        next(error)
        
    }
}