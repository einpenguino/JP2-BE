import { parseAPI, parseMetaData } from '../API/Parsers'
import { getHumidity } from '../API/Queries'
import { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler } from '../API/Datetime'
import prisma from './index'

async function humidityLatestReadings() {
    try{
        const humidity = await prisma.humidity.findMany({
            where : {},
            orderBy : {timestamp : 'desc'} ,
            distinct: ['station_id'],
            select : {
              timestamp : true,
              station_id : true,
              value : true
            }
        })
        return humidity
    }
    catch(e){
        console.log(e)
    }
}

async function readHumidity(params : any) {
    try{
        const result = await prisma.humidity.findMany({
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

async function humidityLatest() {
    try{
        const result = await prisma.humidity.findFirst({
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

async function updateHumidityDaily() {
    let a = new Date()
    let b : any
    let c : any
    b = await humidityLatest()
    c = await getDailyScheduler(b.timestamp)
    // console.log(c)
    for (let d of c){
      try{
        let res : any
        res = await getHumidity(`date=${d}`)
        let json = await parseAPI(res.data)
        let stations = await parseMetaData(res.data)
        await prisma.humidity.createMany({
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

async function updateHumidityMini() {
    let a = new Date()
    let b : any
    let c : any
    b = await humidityLatest()
    c = miniScheduler(b.timestamp, new Date(), 1, 10)
    // console.log(c)
    for (let d of c){
      try{
        let res : any
        res = await getHumidity(`date_time=${d}`)
        let json = await parseAPI(res.data)
        let stations = await parseMetaData(res.data)
        await prisma.humidity.createMany({
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

async function updateHumidity(delay : number, threshold : number) {
    let a = new Date()
    let b : any
    let c : any
    b = await humidityLatest()
    if (a.getTime() - b.timestamp.getTime() > delay * 60 * 1e3 * threshold) {
        // Initiate Daily seeding instead of instantaneous
        c = getDailyScheduler(b.timestamp)
        // console.log(c)
        for (let d of c){
        try{
            let res : any
            res = await getHumidity(`date=${d}`)
            let json = await parseAPI(res.data)
            let stations = await parseMetaData(res.data)
            await prisma.humidity.createMany({
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
            res = await getHumidity(`date_time=${d}`)
            let json = await parseAPI(res.data)
            let stations = await parseMetaData(res.data)
            await prisma.humidity.createMany({
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

export { humidityLatestReadings, readHumidity, humidityLatest, updateHumidityDaily, updateHumidityMini, updateHumidity }