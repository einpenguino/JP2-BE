// import { PrismaClient } from '@prisma/client'
import rainData from './prisma/seedData/rainfall_raw.json'
import {pData} from './prisma/seedData/parsed'
import { parseMetaData, toLocaleISO, toLocaleQueryDate } from './API/Parsers'
// const prisma = new PrismaClient()
// import prisma = require("./app")
import read from './controllers/stations'
import { readRainfall, rainfallLatest } from './controllers/rainfall'
import { domainToASCII } from 'url'
// import prisma from './app'
// const prisma = require('./app')

async function main () {

}

async function createOne(data : any) {
  // await prisma.rainfall.create({
  //   data : data
  // })
}
// let lobj : any
// lobj = parseMetaData(rainData)
// console.log(lobj)

async function findStations(){
  // const stations = await prisma.stations.findMany({
  //   where : {
      
  //   },
  //   // select : {
  //   //   id:false
  //   // }
  // })
  // console.log(stations.length)
}

// console.log(rainfallLatest()
(async () => {
  let result : any
  let d : any
  let d1 : any
  let locale : any
  let option : any
  let localeString : any
  
  // locale = {
  //   nu : ''
  // }
  option = {
    'dateStyle' : 'short',
    'timeStyle' : 'long',
    // calendar : 'iso8601',
    'timeZone' : "Asia/Singapore"
  }
  localeString = {
    year:'numeric',
    month:'numeric',
    day:'numeric',
    hour:'numeric',
    minute:'numeric',
    second:'numeric',
    hour12:false
    // fractionalSecondDigits: 3
  }


  result = await rainfallLatest()
  console.log(toLocaleISO(result.timestamp))
  console.log(toLocaleQueryDate(result.timestamp))
})()

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