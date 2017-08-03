const express = require('express');
const app = express();
const errorHandler = require('./error-handler')();

const restaurants = require('./routes/restaurants');

app.use('/restaurants', restaurants);

app.use(errorHandler);

module.exports = app;