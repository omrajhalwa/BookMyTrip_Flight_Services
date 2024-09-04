
const airplane = require('../models/airplane');
const CrudRepository = require('./crud-repository');
const { Flight } = require('../models')
const db = require('../models');
class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {

        const response = await Flight.findAll({
            where: filter,
            order: sort,
            attributes: [
                'id', 'flightNumber', 'airplaneId', 'departureAirportId', 'arrivalAirportId',
                'arrivalTime', 'departureTime', 'price', 'boardingGate', 'totalSeats',
                'createdAt', 'updatedAt'
            ],
        });

        return response;
    }

    async getFlight(data) {
        const flight = await Flight.findOne({
            where: { id: data },
            attributes: [
                'id',
                'flightNumber',
                'airplaneId',
                'departureAirportId',
                'arrivalAirportId',
                'arrivalTime',
                'departureTime',
                'price',
                'boardingGate',
                'totalSeats',
                'createdAt',
                'updatedAt',
                // Make sure no extra spaces or empty attributes are here
            ]
        });

        return flight;
    }


    async updateRemainingSeats(flightId, seats, dec = true) {
           // Row Lock
        await db.sequelize.query(`SELECT * from Flights WHERE Flights.id = ${flightId} FOR UPDATE;`)
       
        const flight = await Flight.findOne({
            where: { id: flightId },
            attributes: [
                'id','flightNumber','airplaneId','departureAirportId',
                'arrivalAirportId','arrivalTime','departureTime','price',
                'boardingGate','totalSeats','createdAt','updatedAt',
                // Make sure no extra spaces or empty attributes are here
            ]
        });



        if (parseInt(dec)) {
            await flight.decrement('totalSeats', { by: seats });

        } else {
            await flight.increment('totalSeats', { by: seats });

        }
        await flight.save();

        return flight;
    }
}

module.exports = FlightRepository;   