import rainData from './prisma/seedData/rainfall_raw.json'
import {pData} from './prisma/seedData/parsed'
import { parseAPI, parseMetaData } from './API/Parsers'
import { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler } from './API/Datetime'
import read from './controllers/stations'
import { readRainfall, rainfallLatest, updateRainMini, updateRain, updateRainDaily } from './controllers/rainfall'
import { getRainfall, getAirTemp, getHumidity, getWindSpeed, getWindDir } from './API/Queries'
import { updateAirTemp, updateAirTempDaily } from './controllers/airtemp'
import { updateHumidity, updateHumidityDaily } from './controllers/humidity'
import { updateWindDir, updateWindDirDaily } from './controllers/winddir'
import { updateWindSpeed, updateWindSpeedDaily } from './controllers/windspeed'
import axios from 'axios'
import prisma from './controllers/index'
const cron = require('node-cron')
require('./API/Cron')
async function main () {

}

(async () => {
  // let a = await parseMetaData(rainData)
  // console.log(a)
  // let a : any
  // a = await getAirTemp('date_time=2023-02-15T15:00:00')
  // console.log(parseAPI(a.data))
  // updateAirTemp(5, 100)
  // updateHumidity(5,100)
  // await updateWindDir(5,100)
  // await updateWindSpeed(5,100)
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