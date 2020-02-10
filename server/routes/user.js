const express = require('express');
const router = express.Router();
const Controller = require("../controllers/user");

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.use(require('../middlewares/authentication'))

module.exports = router