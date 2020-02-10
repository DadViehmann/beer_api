const express = require('express'); //go into node_modules folder find express and exprot whatever it gives us
const mongoose = require('mongoose');
const beerRouter = require('./routes/beerRouter.js'); //path to Router file which contains all of the get/post/put/delete functions

const app = express(); //store express inside of an object

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/beers', beerRouter);

mongoose.connect('mongodb://localhost:27017/beers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //dbName: 'beers',
});

mongoose.connection.on('connected', () => {
  console.log('Connected to beers database');
  app.listen(4444, () => { //(port, callback function)
    console.log('Listening on port 4444 ...');
  });
});
mongoose.connection.on('error', () => {
  console.log('Error connectiong to beers database :(');
  process.exit(1);
});
