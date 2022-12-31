const express = require("express");
const router = express.Router();

const Url = require('../database/url');

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

router.get('/',function (req, res) {
  try {
    Url.find({},(err,data)=>{
      if(err){
        res.send("Server error");
      }else{
        res.json(data);
      }
    })
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports=router;