import { parseAPI, parseMetaData } from '../API/Parsers'
import { getWindSpeed } from '../API/Queries'
import { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler } from '../API/Datetime'
import prisma from './index'

async function readWindSpeed(params : any) {
    try{
        const result = await prisma.windspeed.findMany({
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

async function windSpeedLatest() {
    try{
        const result = await prisma.windspeed.findFirst({
            where : {},
            select : {
                'timestamp' : true,
            },
            orderBy:{'timestamp' : 'desc'},
            take:1
        })
        return result
    }
    catch(e){
        console.log(e)
    }
}

async function updateWindSpeedDaily() {
    let a = new Date()
    let b : any
    let c : any
    b = await windSpeedLatest()
    c = await getDailyScheduler(b.timestamp)
    // console.log(c)
    for (let d of c){
      try{
        let res : any
        res = await getWindSpeed(`date=${d}`)
        let json = await parseAPI(res.data)
        let stations = await parseMetaData(res.data)
        await prisma.windspeed.createMany({
          data : json,
          skipDuplicates: true,
        })
        await prisma.stations.createMany({
            data:stations,
            skipDuplicates: true
        })
      }
      catch(e){
        console.log(e)
      }
      
    }
}

async function updateWindSpeedMini() {
    let a = new Date()
    let b : any
    let c : any
    b = await windSpeedLatest()
    c = miniScheduler(b.timestamp, new Date(), 1, 10)
    // console.log(c)
    for (let d of c){
      try{
        let res : any
        res = await getWindSpeed(`date_time=${d}`)
        let json = await parseAPI(res.data)
        let stations = await parseMetaData(res.data)
        await prisma.windspeed.createMany({
          data : json,
          skipDuplicates: true,
        })
        await prisma.stations.createMany({
            data:stations,
            skipDuplicates: true
        })
      }
      catch(e){
        console.log(e)
      }
      
    }
}

async function updateWindSpeed(delay : number, threshold : number) {
    let a = new Date()
    let b : any
    let c : any
    b = await windSpeedLatest()
    if (a.getTime() - b.timestamp.getTime() > delay * 60 * 1e3 * threshold) {
        // Initiate Daily seeding instead of instantaneous
        c = getDailyScheduler(b.timestamp)
        // console.log(c)
        for (let d of c){
        try{
            let res : any
            res = await getWindSpeed(`date=${d}`)
            let json = await parseAPI(res.data)
            let stations = await parseMetaData(res.data)
            await prisma.windspeed.createMany({
                data : json,
                skipDuplicates: true,
            })
            await prisma.stations.createMany({
                data:stations,
                skipDuplicates: true
            })
        }
        catch(e){
            console.log(e)
        }
    }
    }
    else {
        // Use Mini updating
        c = miniScheduler(b.timestamp, new Date(), 1, 10)
        // console.log(c)
        for (let d of c){
        try{
            let res : any
            res = await getWindSpeed(`date_time=${d}`)
            let json = await parseAPI(res.data)
            let stations = await parseMetaData(res.data)
            await prisma.windspeed.createMany({
                data : json,
                skipDuplicates: true,
            })
            await prisma.stations.createMany({
                data:stations,
                skipDuplicates: true
            })
        }
        catch(e){
            console.log(e)
        }
        }
    }
    
}

export { readWindSpeed, windSpeedLatest, updateWindSpeedDaily, updateWindSpeedMini, updateWindSpeed }