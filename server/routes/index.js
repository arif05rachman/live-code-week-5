const express = require('express');
const router = express.Router();
const Comic = require('./comic')
const User = require('./user')

router.use('/', User)
router.use('/comics', Comic)
module.exports = router