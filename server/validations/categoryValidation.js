const {body } = require ('express-validator');

exports.categoryValidation = [
    body('name')
    .notEmpty().withMessage('Category name is required').isLength({min: 3}).withMessage('Category name must be at least 3 characters')
]