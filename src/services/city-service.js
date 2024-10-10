const { StatusCodes } = require('http-status-codes');
const { CityRepository }=require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();


async function createCity(data){
    try {
        const city= await cityRepository.create(data);
       // console.log(airplane);
        return city;
      } catch (error) {
       console.log(error);
       if(error.name=='SequelizeValidationError' || error.name ==='SequelizeUniqueConstraintError'){
           let explanation=[];
           error.errors.forEach((err)=>{
               explanation.push(err.message);
           })
           console.log(explanation);
           throw new AppError(explanation,StatusCodes.BAD_REQUEST);
       }

       throw new AppError('Cannot create a new Airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
      }
}

async function getCity() {
  try {
    const city = await cityRepository.getAll();
    return city;
  } catch (error) {
    throw new AppError('Cannot fetch data of all the city',StatusCodes.INTERNAL_SERVER_ERROR);
  }
    
}


module.exports={
  createCity,
  getCity
}
