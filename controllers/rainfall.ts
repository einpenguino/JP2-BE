const httpstatus = require('http-status')
// import httpstatus from 'http-status'
import prisma from './index'

async function readRainfall(params : any) {
    try{
        const result = await prisma.rainfall.findMany({
            where : params,
            select : {
                'timestamp' : true,
                'station_id' : true,
                'value' : true
            }
        })
        return result
    }
    catch(e){
        console.log(e)
    }
}

async function rainfallLatest() {
    try{
        const result = await prisma.rainfall.findFirst({
            where : {},
            select : {
                'timestamp' : true,
            },
            orderBy:{'timestamp' : 'desc'},
            take:1
        })
        // console.log(result)
        return result
    }
    catch(e){
        console.log(e)
    }
}
// module.exports = { read }
export { readRainfall, rainfallLatest }
// export * as stationController 