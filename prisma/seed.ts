import { PrismaClient } from '@prisma/client'
// import { data } from './seed_data'
import { UserSeed } from './seedData/userSeed'
import { placesSeed } from './seedData/placesSeed'
import { routesSeed } from './seedData/routesSeed'
import rainData from './seedData/rainfall_raw.json'
import stationData from './seedData/overall_stations.json'
import airTemp from './seedData/airtemp_raw.json'
import humidity from './seedData/humidity_raw.json'
import windDir from './seedData/winddir_raw.json'
import windSpeed from './seedData/windspeed_raw.json'
import { parseAPI, parseMetaData } from '../API/Parsers'
import { pData } from './seedData/parsed'
import { create } from 'domain'
const prisma = new PrismaClient()

async function createOne(data : any) {
  const user = await prisma.rainfall.create({
    data : data
  })
  console.log(user)
}
let iobj : any
iobj = parseAPI(rainData)


async function seed() {
  await prisma.user.createMany({
    data: await UserSeed(),
    skipDuplicates: true, // Skip 'Bobo'
  })
  await prisma.places.createMany({
    data : placesSeed,
    skipDuplicates: true
  })
  await prisma.routes.createMany({
    data: routesSeed,
    skipDuplicates:true
  })
  await prisma.stations.createMany({
    data:stationData.stations,
    skipDuplicates: true
  })  
  await prisma.airtemp.createMany({
    data : parseAPI(airTemp),
    skipDuplicates : true
  })
  await prisma.humidity.createMany({
    data : parseAPI(humidity),
    skipDuplicates : true
  })
  await prisma.rainfall.createMany({
    data : parseAPI(rainData),
    skipDuplicates: true,
  })
  await prisma.winddir.createMany({
    data : parseAPI(windDir),
    skipDuplicates : true
  })
  await prisma.windspeed.createMany({
    data : parseAPI(windSpeed),
    skipDuplicates : true
  })
  

  console.log(iobj.length)
  console.log('Multiple Creation Completed!')
}

interface stationsData {
  'timestamp': string,
  'station_id': string,
  'value': number
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })