const { check } = require('express-validator');
const { validationResult } = require('express-validator')
exports.validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage("Enter the first name"),
    check('lastName')
        .notEmpty()
        .withMessage("Enter the last name"),
    check('email')
        .notEmpty()
        .withMessage("Enter the email"),
    check('password')
        .isLength({ min: 6 })
        .withMessage("Password must be more than 6 character"),
]
exports.validateSigninRequest = [
    check('email')
        .notEmpty()
        .withMessage("Enter the email"),
    check('password')
        .isLength({ min: 6 })
        .withMessage("Password must be more than 6 character"),
]
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({
            errors: errors.array()[0].msg
        })
    }
    next()
}
