const { signup, admin } = require('../controller/controller.js');

const router = require('express').Router();


//HTTP Request//
router.post('/user/signup',signup);
router.post('/product/admin',admin);

module.exports = router;
