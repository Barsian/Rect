const express = require('express');
const router = express.Router();
const rectModel = require('../models/Rect')
const path = require('path');
const logger = require('../startup/logging');

router.get('/overlap_rects', async (req,res) =>{
  let overlap_rects_data = await rectModel.SelectAllOverlapRects();
  res.send(overlap_rects_data)
});

router.post('/is_overlap', async (req,res) =>{
  res.send("test");
});

module.exports = router;