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
import axios from 'axios'
import prisma from './controllers/index'
const cron = require('node-cron')
import bcrypt from 'bcrypt'
import { genPassword, comparePassword } from './middleware/hashing'
import { UserSeed } from './prisma/seed_data'
// require('./API/Cron')
async function main () {

}

// (async () => {
//   // let a = await parseMetaData(rainData)
//   // console.log(a)
//   // let a : any
//   // a = await getAirTemp('date_time=2023-02-15T15:00:00')
//   // console.log(parseAPI(a.data))
//   // updateAirTemp(5, 100)
//   // updateHumidity(5,100)
//   // await updateWindDir(5,100)
//   // await updateWindSpeed(5,100)
// })()

(async () => {
  // try{
  //   // console.log('index')
  //   await prisma.places.createMany({
  //     data : [{
  //       name:'Home',
  //       latitude: 1.1,
  //       longitude: 0
  //       },
  //       {
  //         name:'Work',
  //         latitude: 0,
  //         longitude: 1.1
  //       }
  //     ],
  //     skipDuplicates: true
  //   })
  // }catch(e){
  //   console.log(e)
  // }
  // try{
  //   // console.log('index')
  //   await prisma.user.createMany({
  //     data : [{
  //     email:'admin1',
  //     password: 'admin',
  //     name: 'admin',
  //     isAdmin: true
  //     }],
  //     skipDuplicates: true
  //   })
  // }catch(e){
  //   console.log(e)
  // }
  // try{
  //   console.log('index')
  //   await prisma.routes.createMany({
  //     data : [{
  //     start_id: 1,
  //     end_id: 2,
  //     user_fk: 1
  //     }],
  //     skipDuplicates: true
  //   })
  // }catch(e){
  //   console.log(e)
  // }
  // const hash = await genPassword('hi')
  // console.log(hash)

  // const result = await comparePassword('hi', hash)
  // console.log(result)
  console.log(await UserSeed())

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