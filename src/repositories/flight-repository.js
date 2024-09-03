
const airplane = require('../models/airplane');
const CrudRepository = require('./crud-repository');
const {Flight}=require('../models')
class FlightRepository extends CrudRepository{
       constructor(){
          super(Flight);    
       }

       async getAllFlights(filter , sort ) {
       
        const response = await Flight.findAll({
            where: filter ,
            order: sort   ,
            attributes: [
                'id', 'flightNumber', 'airplaneId', 'departureAirportId', 'arrivalAirportId',
                'arrivalTime', 'departureTime', 'price', 'boardingGate', 'totalSeats', 
                'createdAt', 'updatedAt'
            ] ,
        });
       
        return response;
       }

       async getFlight(data){
        const flight = await Flight.findOne({
            where: { id: '1' },
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
}

module.exports = FlightRepository;   