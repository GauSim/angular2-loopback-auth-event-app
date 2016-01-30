const bluebird = require('bluebird');
const _ = require('underscore');
const m = require('../services/logger');
const _logger = m.Logger.child({ ClassName: '[SEED]' });

const seedAdmins = require('../seed/admins.js');

module.exports = function (server) {
    const CustomerModel = server.models.Customer;
    const EventModel = server.models.Event;


    function createAdmins(Admins) {
        var upsertUserModel = bluebird.promisify(CustomerModel.upsert, { context: CustomerModel });
        return upsertUserModel(Admins).then((result) => {
            _logger.info('Admin created.');
            return result;
        });
    }

    function createEvent(Customer) {
        //var create = bluebird.promisify(EventModel.upsert, { context: CustomerModel });
        console.log()



        const create = () => {

            const date = new Date();
            date.setFullYear(2015);
            
            const event = {
                "name": "string",
                "date": date,
                "url": "string",
                "location": "string",
                "description": "string",
                "id": 0,
                "customerId": Customer.Id
            }
            return Customer.events.create(event).then(e=> {
                _logger.info('created event', e);
                return e;
            });
        }
        return bluebird.all([
            create(),
            create(),
            create(),
            create(),
            create(),
            create(),
            create(),
            create(),
            create(),
            create(),
            create(),
            create(),
            create(),
            create()
        ]);

    }

    createAdmins(seedAdmins).then(customers => customers.map(customer=> {
        return createEvent(customer);
    }));

};
