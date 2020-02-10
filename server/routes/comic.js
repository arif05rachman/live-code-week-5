const express = require('express');
const router = express.Router();
const Controller = require("../controllers/comic");
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.put('/:id', Controller.update)

module.exports = router