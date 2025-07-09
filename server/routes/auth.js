const express = require ('express');
const router = express.Router();
const { signup, login} = require('../controllers/authController');
const {signupValidation,loginValidation} = require("../validations/authValidation")

router.post("/signup", signup, signupValidation );
router.post("/login", login,loginValidation);

module.exports = router;