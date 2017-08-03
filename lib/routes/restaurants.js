const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const jsonParser = require('body-parser').json();

router

    .get('/restaurants', (req, res, next) => {
        Restaurant.find()
            .lean()
            .select('__v _id name cuisine')
            .then(restaurants => res.send(restaurants))
            .catch(next);
    })

    .get('/restaurants/:id', (req, res, next) => {
        Restaurant.findById(req.params.id)
            .then(restaurants => res.send(restaurants))
            .catch(next);
    })

    .use(jsonParser)

    .post('/restaurant', (req, res, next) => {
        new Restaurant(req.body)
            .save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        delete req.body._id;
        Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(restaurant => res.send(restaurant))
            .catch(next);

    });

module.exports = router;