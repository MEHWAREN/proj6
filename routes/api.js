'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = ConvertHandler;

  app.route('/api/convert').get((req,res)=>{
    if(convertHandler(req.query.input).ok){
      res.send(convertHandler(req.query.input).json)
    }
    else{
      res.send(convertHandler(req.query.input).errorMessage)
    }
  })
};
