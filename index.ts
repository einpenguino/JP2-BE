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
  }catch(e) {
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