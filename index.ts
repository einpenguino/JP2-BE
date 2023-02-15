import rainData from './prisma/seedData/rainfall_raw.json'
import {pData} from './prisma/seedData/parsed'
import { parseAPI, parseMetaData } from './API/Parsers'
import { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler } from './API/Datetime'
import read from './controllers/stations'
import { readRainfall, rainfallLatest } from './controllers/rainfall'
import { domainToASCII } from 'url'
import { getRainfall, getAirTemp, getHumidity, getWindSpeed, getWindDir } from './API/Queries'
import { updateRainMini, updateRain } from './API'
import axios from 'axios'
import prisma from './controllers/index'
const cron = require('node-cron')

async function main () {

}

(async () => {
  // let a = await parseMetaData(rainData)
  // console.log(a)
  let a : any
  a = await getAirTemp('date_time=2023-02-15T15:00:00')
  console.log(parseAPI(a.data))
})()

let a = 0
cron.schedule("20 */5 * * * *", function () {
  a += 1
  console.log("---------------------");
  console.log("running a task every 20th second");
  updateRain(10, 100)
  console.log(a);
  console.log(toLocaleISO(new Date()))
});

// cron.schedule("*/5 * * * * *", function () {
//   console.log("---------------------");
//   console.log("running a task every 5 second");
//   // updateRainMini()
//   // console.log(a);
//   console.log(toLocaleISO(new Date()))
// });

// console.log(findStations())
// findStations()
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })