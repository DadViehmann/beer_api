const express = require('express');
const beerRouter = express.Router();
const Beer = require('../models/beer.js');

beerRouter.get('/hello', (req, res) => {
  console.log('Got a request!');
  res.send('<h1>Hallo und gute morgen mein Liebesfruende. Was magst du?</h1>');
});

beerRouter.get('/', (req, res) => {
  Beer.find((err, beers) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.json(beers);
    }
  });
});

beerRouter.get('/:beer_id', (req, res) => {
  Beer.findById(req.params.beer_id, (err, beer) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(beer);
    }
  });
});

beerRouter.put('/:beer_id', (req, res) => {
  Beer.findById(req.params.beer_id, (err, beer) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      beer.name = req.body.name;
      beer.rating = req.body.rating;

      beer.save((err, beer) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.send(`Beer posted!\n${beer}`);
        }
      });
    }
  });
});

beerRouter.delete('/:beer_id', (req, res) => {
  Beer.deleteOne({
    _id: req.params.beer_id
  }, (err) => {
    if (err) {
      res.status(400).send(err);
    }
    else{
      res.send(`Successfully delete beer with id: ${req.params.beer_id}`);
    }
  }

  );
});

beerRouter.post('/', (req, res) => {
  let beer = new Beer();
  beer.name = req.body.name;
  beer.rating = req.body.rating;
  beer.save((err, beer) => {
    if (err) {
      res.status(500);
      res.send(err);
    }
    else {
      res.send(`Saved your ${beer}`);
    }
  });
});

module.exports = beerRouter;