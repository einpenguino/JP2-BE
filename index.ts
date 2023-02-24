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
  //   const stations = await prisma.stations.findMany({
  //     where:{
  //       reading_unit : 'mm'
  //     },
  //     orderBy:{
  //       device_id:'asc'
  //     },
  //     select : {
  //       device_id : true
  //     }
  //   })
  //   // console.log(stations)
  //   let stationsReformat : any
  //   stationsReformat = {}
  //   stations.map(ele => {
  //     stationsReformat[parseInt(ele.device_id.slice(1))] = ele.device_id
  //   })
  //   // console.log(stationsReformat)
  //   let columns : any
  //   let colStation : any
  //   let stationCol : any
  //   let iter = 1
  //   columns = []
  //   colStation = {}
  //   stationCol = {}
  //   for (let i in stationsReformat){
  //     columns.push({
  //       field : `col${iter}`,
  //       headerName : stationsReformat[i],
  //       width : 15
  //     })
  //     colStation[`col${iter}`] = stationsReformat[i]
  //     stationCol[stationsReformat[i]] = `col${iter}`
  //     iter += 1
  //   }
  //   // console.log(columns)
  //  const result = await prisma.rainfall.findMany({
  //   where : {
  //     timestamp : {
  //       gte : new Date (new Date().getTime() - 1e3 * 60 * 500)
  //     },
  //   },
  //   select : {
  //     timestamp: true,
  //     station_id : true,
  //     value : true
  //   },
  //   orderBy : {
  //     // station_id:'asc'
  //     timestamp : 'desc'
  //   },
  //   // take : 10000
  //  })
  //  console.log(result)
  //  let resultReformat : any
  //  resultReformat = {}
  //  iter = 1
  //  result.map((ele) => {
  //   let localTime = toLocaleISO(ele.timestamp)
  //   if (!(localTime in resultReformat)){
  //     resultReformat[localTime] = {}
  //   }
  //   resultReformat[localTime][ele.station_id] = ele.value
  //  })
  // console.log(resultReformat)
  // let resultReformat1 : any
  // resultReformat1 = []
  // let tempObj : any
  // // iter = 1
  //  for (let time in resultReformat){
  //   tempObj = {id : time}
  //   for (let s in resultReformat[time]){
  //     tempObj[stationCol[s]] = resultReformat[time][s]
  //   }
  //   resultReformat1.push(tempObj)
  //  }
  //  console.log(resultReformat1)

  
  //  let resultFormat : any
  //  resultFormat = {}
  //  result.map((ele) : any => {
  //   // resultFormat{
  //   let localeISO=toLocaleISO(ele.timestamp)
  //   if (!(localeISO in resultFormat)){
  //     resultFormat[localeISO] = [{
  //       'station' : ele.station_id,
  //       'value' : ele.value
  //     }]
  //   }else{
  //     resultFormat[localeISO].push({
  //       'station' : ele.station_id,
  //       'value' : ele.value
  //     })
    // }

  //   const rows = [
  //     { id: 1, col1: 'Hello', col2: 'World' },
  //     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  //     { id: 3, col1: 'MUI', col2: 'is Amazing' },
  // ];

  // const columns = [
  //     { field: 'col1', headerName: 'Column 1', width: 150 },
  //     { field: 'col2', headerName: 'Column 2', width: 150 },
  // ];

    // }
  //  }
  //  )
  //  console.log(toLocaleISO(result[0].timestamp))
  // console.log(resultFormat)
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