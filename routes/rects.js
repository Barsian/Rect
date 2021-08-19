const express = require('express');
const router = express.Router();
const rectModel = require('../models/Rect')
const moment = require('moment');

router.get('/', async (req, res) => {
  let overlapRectsData = await rectModel.SelectAllOverlapRects();
  if (!overlapRectsData)
    return res.status(400).send('No data found !');
  else {
    return res.status(200).send(overlapRectsData);
  }
});
router.post('/', async (req, res) => {
  const mainRect = req.body.main;
  const inputRects = req.body.input;
  let overlappedRects = [];
  await inputRects.forEach(async (secondRect) => {
    let leftX = Math.max(mainRect.x, secondRect.x);
    let rightX = Math.min(mainRect.x + mainRect.width, secondRect.x + secondRect.width);
    let topY = Math.max(mainRect.y, secondRect.y);
    let bottomY = Math.min(mainRect.y + mainRect.height, secondRect.y + secondRect.height);
    if (leftX < rightX && topY < bottomY) {
      //overlapped
      overlappedRects.push(secondRect);
    }
  });
  if (overlappedRects.length === 0) {
    return res.status(400).send('No overlapped rectangles found!');
  } else {
    let mainId = await rectModel.InsertMainRect(mainRect);
    if (!mainId)
      return res.status(400).send('catch inserted rows failed');
    else {
      const timeNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let newOverlappedRects = overlappedRects.map(item => ({
        ...item, time: timeNow, main_id: mainId
      }));
      let insertOverRects = await rectModel.InsertOverlapRects(newOverlappedRects);
      if (!insertOverRects)
        return res.status(400).send('catch inserted rows failed');
      else {
        return res.status(200).send('Successful!');
      }
    }
  }
});

module.exports = router;