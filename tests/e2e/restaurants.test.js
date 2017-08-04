const db = require('./helpers/db');
const request = require('./helpers/request');
const assert = require('chai').assert;

describe('restaurant REST api', () => {

    before(db.drop);

    let validRest1 = {
        name: 'Asian Gardens',
        address: {
            street: 'Burnside',
            city: 'Portland'
        },
        cuisine: ['asian']
    };
    let validRest2 = {
        name: 'Euro Gardens',
        address: {
            street: 'Powell',
            city: 'Portland'
        },
        cuisine: ['euro']
    };

    let noName = {
        name: '',
        address: {
            street: 'Burnside',
            city: 'Portland'
        },
        cuisine: ['asian']
    };
    let noCuisine = {
        name: 'Comfort Gardens',
        address: {
            street: 'Burnside',
            city: 'Portland'
        },
        cuisine: ['']
    };
    let badCuisine = {
        name: 'Mexican Gardens',
        address: {
            street: 'Burnside',
            city: 'Portland'
        },
        cuisine: ['mexican']
    };

    function saveRestaurant(restaurant) {
        return request.post('/restaurant')
            .send(restaurant)
            .then(res => res.body);
    }

    it('returns both restaurants', () => {
        saveRestaurant(validRest1),
        saveRestaurant(validRest2)

            .then(savedRestaurants => {
                validRest1 = savedRestaurants[0];
                validRest2 = savedRestaurants[1];
            })
            .then(() => request.get('/restaurants'))
            .then(res => res.body)
            .then(restaurants => {
                assert.equal(restaurants.length, 2);
                assert.deepInclude(restaurants, validRest1);
                assert.deepInclude(restaurants, validRest2);
            });
    });

    it('gets restaurant by id', () => {
        return request.get(`/restaurants/${validRest1._id}`)

            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, validRest1);
                assert.equal(got.name, 'Asian Gardens');
            });
    });

    it('errors on validation failure', () => {
        return saveRestaurant(noName)
            .then(
                () => { throw new Error('expected failure'); },
                () => { }
            );
    });
});