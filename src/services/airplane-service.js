const { AirplaneRepository }=require('../repositories');

const airplaneRepository = new AirplaneRepository();

async function  createAirplane(data){
       try {
         const airplane = await airplaneRepository.create(data);
        // console.log(airplane);
         return airplane;
       } catch (error) {
        console.log(error);
       }
}

module.exports={
    createAirplane
}