const db = require('./helpers/db');
const request = require('./helpers/request');
const assert = require('chai').assert;

describe('restaurant REST api', () => {

    before(db.drop);

    let validRest = {
        name: 'Asian Gardens',
        address: {
            street: 'Burnside',
            city: 'Portland'
        },
        cuisine: ['Asian']
    };

    let noName = {
        name: '',
        address: {
            street: 'Burnside',
            city: 'Portland'
        },
        cuisine: ['Asian']
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
        cuisine: ['Mexican']
    };

    function saveRestaurant(restaurant) {

        return request.post('/restaurants')
            .send(restaurant)
            .then(res => res.body);
    }

    it('errors on validation failure', () => {
        return saveRestaurant(noName)
            .then(
                () => { throw new Error('expected failure'); },
                () => { }
            );
    });
});