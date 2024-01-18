const express = require('express');
const aiContoller = require("../conrtollers/aiController")

const router = express.Router();


router.post('/evaluation', aiController.evaluation)


module.exports = router;