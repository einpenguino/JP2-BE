import { PrismaClient } from '@prisma/client'
import rainData from './prisma/seedData/rainfall_raw.json'
import {pData} from './prisma/seedData/parsed'
import { parseMetaData } from './API/Parsers'
const prisma = new PrismaClient()

async function main () {

}

async function createOne(data : any) {
  await prisma.rainfall.create({
    data : data
  })
}
// interface coo {
//   'latitude':number,
//   'longitude':number
// }
// interface stationsMetadata {
//   device_id: string,
//   name: string,
//   latitude: number,
//   longitude: number
// }
// let stationsMet : stationsMetadata[]
// stationsMet=[]
// rainData.metadata.stations.map((ele) => {
//   stationsMet.push({
//     device_id:ele.device_id,
//     name: ele.name,
//     latitude: ele.location.latitude,
//     longitude: ele.location.latitude
//   })
// })

// console.log(stationsMet)
let lobj : any
lobj = parseMetaData(rainData)
console.log(lobj)

// let iobj : any
// iobj = parseAPI(rainData)
// let i1 : any
// i1 = iobj.slice(0, 10)
// pData.slice(0,1).map((ele) => {
//   // console.log(typeof ele.value)
//   createOne(ele)
// })
// console.log(iobj.slice(10))
// console.log(i1)
// let lobj : any
// lobj = p1(rainData)
// console.log(lobj[lobj.length-1])
// console.log(pData)
// console.log(rainData.items[0].readings)

// console.log(rainData.items[0].timestamp)

// console.log(parseAPI(rainData))
// rainData.items[rainData.items.length - 2].readings.forEach((element) => {
//   console.log(element)
// })
// rainData.items.forEach((ele) => {
//   console.log(ele.timestamp)
// })
// rainData.items.forEach((ele) => {
//   ele.readings.forEach((ele1) => {
//     console.log({
//       'ts' : ele.timestamp,
//       'si': ele1.station_id,
//       'v': ele1.value
//     })
//   })
// })
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })