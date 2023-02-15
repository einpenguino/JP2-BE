import { parseAPI, parseMetaData } from '../API/Parsers'
import { getWindDir } from '../API/Queries'
import { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler } from '../API/Datetime'
import prisma from './index'

async function readWindDir(params : any) {
    try{
        const result = await prisma.winddir.findMany({
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

async function windDirLatest() {
    try{
        const result = await prisma.winddir.findFirst({
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

async function updateWindDirDaily() {
    let a = new Date()
    let b : any
    let c : any
    b = await windDirLatest()
    c = await getDailyScheduler(b.timestamp)
    // console.log(c)
    for (let d of c){
      try{
        let res : any
        res = await getWindDir(`date=${d}`)
        let json = await parseAPI(res.data)
        let stations = await parseMetaData(res.data)
        await prisma.winddir.createMany({
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

async function updateWindDirMini() {
    let a = new Date()
    let b : any
    let c : any
    b = await windDirLatest()
    c = miniScheduler(b.timestamp, new Date(), 1, 10)
    // console.log(c)
    for (let d of c){
      try{
        let res : any
        res = await getWindDir(`date_time=${d}`)
        let json = await parseAPI(res.data)
        let stations = await parseMetaData(res.data)
        await prisma.winddir.createMany({
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

async function updateWindDir(delay : number, threshold : number) {
    let a = new Date()
    let b : any
    let c : any
    b = await windDirLatest()
    if (a.getTime() - b.timestamp.getTime() > delay * 60 * 1e3 * threshold) {
        // Initiate Daily seeding instead of instantaneous
        c = getDailyScheduler(b.timestamp)
        // console.log(c)
        for (let d of c){
        try{
            let res : any
            res = await getWindDir(`date=${d}`)
            let json = await parseAPI(res.data)
            let stations = await parseMetaData(res.data)
            await prisma.winddir.createMany({
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
            res = await getWindDir(`date_time=${d}`)
            let json = await parseAPI(res.data)
            let stations = await parseMetaData(res.data)
            await prisma.winddir.createMany({
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

export { readWindDir, windDirLatest, updateWindDirDaily, updateWindDirMini, updateWindDir }