const httpstatus = require('http-status')
// import httpstatus from 'http-status'
import prisma from './index'
// const prisma = require('../app')

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()


// async function find (req, res) {
//     try{
//         console.log(req.body)
//         res.send(req.body)
//     }
//     catch(e){
//         console.log(e)
//     }
// }

async function stationsLatestReadings() {
    try{
        const stations = await prisma.stations.findMany({
            where: {},
            orderBy: {
                device_id: 'asc'
            }
        })
        return stations
    }
    catch(e){
        console.log(e)
    }
}
// module.exports = { read }
export { stationsLatestReadings }
// export * as stationController 