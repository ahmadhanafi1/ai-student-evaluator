const express = require('express');
const aiController = require('../conrtollers/aiController')

const router = express.Router();

router.post('/evaluate', aiController.evaluate)

module.exports = router;