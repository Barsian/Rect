const express = require('express');
const router = express.Router();
const RectModel = require('../models/Rect')
const path = require('path');

router.get('/', async (req,res) =>{
  res.send("test");
})

module.exports = router;