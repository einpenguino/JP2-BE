import rainData from './prisma/seedData/rainfall_raw.json'
import {pData} from './prisma/seedData/parsed'
import { parseAPI, parseMetaData } from './API/Parsers'
import { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler } from './API/Datetime'
import { readRainfall, rainfallLatest, updateRainMini, updateRain, updateRainDaily, rainfallLatestReadings } from './controllers/rainfall'
import { getRainfall, getAirTemp, getHumidity, getWindSpeed, getWindDir } from './API/Queries'
import { airTempLatestReadings, updateAirTemp, updateAirTempDaily } from './controllers/airtemp'
import { humidityLatestReadings, updateHumidity, updateHumidityDaily } from './controllers/humidity'
import { updateWindDir, updateWindDirDaily, windDirLatestReadings } from './controllers/winddir'
import { updateWindSpeed, updateWindSpeedDaily, windSpeedLatestReadings } from './controllers/windspeed'
import { stationsLatestReadings } from './controllers/stations'
import prisma from './controllers/index'
const cron = require('node-cron')
import { UserSeed } from './prisma/seedData/userSeed'
import { findUserOrThrow } from './controllers/user'
import { challengeLogin } from './controllers/userCreds'
// require('./API/Cron')
async function main () {

}

try{

}catch(e) {
  console.log(e)
}
(async () => {
  try{
   const result = await prisma.rainfall.findMany({
    where : {
      timestamp : {
        gte : new Date (new Date().getTime() - 1e3 * 60 * 100)
      },
    },
    select : {
      timestamp: true,
      station_id : true,
      value : true
    },
    orderBy : {
      station_id:'asc'
    },
    // take : 10000
   })
   console.log(result)
   let resultFormat : any
   resultFormat = {}
   result.map((ele) : any => {
    // resultFormat{
    let localeISO=toLocaleISO(ele.timestamp)
    if (!(localeISO in resultFormat)){
      resultFormat[localeISO] = [{
        'station' : ele.station_id,
        'value' : ele.value
      }]
    }else{
      resultFormat[localeISO].push({
        'station' : ele.station_id,
        'value' : ele.value
      })
    }

    // }
   }
   )
  //  console.log(toLocaleISO(result[0].timestamp))
  console.log(resultFormat)
  // console.log(toLocaleISO(new Date (new Date().getTime() - 1e3 * 60 * 20)))
  //  console.log(routes)
  //  let a : any
  //  a = routes[0]
  //  console.log(a.user_rel.routes)
    // await prisma.places.update({
    //   where:{
    //     id: 1
    //   },
    //   data:{
    //     user_fk: {
    //       set:[
    //         // {id:1},
    //         // {id:2}
    //         {username : 'a'},
    //         {username : 'yewande'}
    //       ]
    //     }
    //   }
    // })
    // const places = await prisma.places.findFirstOrThrow({
    //   where : {
    //     id: 1
    //   },
    //   include:{
    //     user_fk: {
    //       select:{
    //         username:true
    //       }
    //     }
    //   }
    // })
    // console.log(places)
  }catch(e) {
    console.log(e)
  }

})()


// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })