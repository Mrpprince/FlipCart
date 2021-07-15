const User = require('../models/userModels')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) {
                res.status(400).json({
                    message: "Email Already Exist"
                })
            }

            const { firstName, lastName, email, password } = req.body;

            const __user = new User({
                firstName,
                lastName,
                email,
                password,
                userName: Math.random().toString(),


            })

            __user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something Went wrong"
                    })
                }
                if (data) {
                    return res.status(200).json({
                        message: "User Created Successfully"
                    })
                }
            })
        })
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                res.status(400).json({
                    error
                })
            }
            if (user) {
                if (user.authenticate(req.body.password) && user.role==="user") {
                    const token = jwt.sign({ _id: user._id ,role:user.role}, process.env.JWT__SECRET__KEY, { expiresIn: '1h' })

                    const { _id, firstName, lastName, fullName, email, role } = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id,
                            firstName,
                            lastName,
                            fullName,
                            email,
                            role
                        }
                    })
                } else {
                    return res.status(401).json({
                        message: "Invalid password"
                    })
                }

            } else {
                res.status(400).json({
                    message: "Something Went wrong"
                })
            }
        })
}

