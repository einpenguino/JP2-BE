import { parseAPI, parseMetaData } from '../API/Parsers'
import { getWindDir } from '../API/Queries'
import { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler } from '../API/Datetime'
import prisma from './index'

async function windDirLatestReadings() {
    try{
        const windDir = await prisma.winddir.findMany({
            where : {},
            orderBy : {timestamp : 'desc'} ,
            distinct: ['station_id'],
            select : {
              timestamp : true,
              station_id : true,
              value : true
            }
        })
        return windDir
    }
    catch(e){
        console.log(e)
    }
}
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

async function windDirFormatted(inputDate : any){
    const stations = await prisma.stations.findMany({
        where:{
        reading_unit : 'degrees'
        },
        orderBy:{
        device_id:'asc'
        },
        select : {
        device_id : true
        }
    })
    // console.log(stations)
    let stationsReformat : any
    stationsReformat = {}
    stations.map(ele => {
        stationsReformat[parseInt(ele.device_id.slice(1))] = ele.device_id
    })
    // console.log(stationsReformat)
    let columns : any
    let colStation : any
    let stationCol : any
    let iter = 2
    columns = [{ field: 'col1', headerName: 'Datetime', width: 180 }]
    colStation = {}
    stationCol = {}
    for (let i in stationsReformat){
        columns.push({
        field : `col${iter}`,
        headerName : stationsReformat[i],
        width : 15
        })
        colStation[`col${iter}`] = stationsReformat[i]
        stationCol[stationsReformat[i]] = `col${iter}`
        iter += 1
    }
    // console.log(columns)
    const result = await prisma.winddir.findMany({
    where : {
        timestamp : {
        gte : new Date(inputDate)
        },
    },
    select : {
        timestamp: true,
        station_id : true,
        value : true
    },
    orderBy : {
        // station_id:'asc'
        timestamp : 'desc'
    },
    // take : 10000
    })
    // console.log(result)
    let resultReformat : any
    resultReformat = {}
    iter = 1
    result.map((ele) => {
    let localTime = toLocaleISO(ele.timestamp)
    if (!(localTime in resultReformat)){
        resultReformat[localTime] = {}
    }
    resultReformat[localTime][ele.station_id] = ele.value
    })
    // console.log(resultReformat)
    let resultReformat1 : any
    resultReformat1 = []
    let tempObj : any
    iter = 1
    for (let time in resultReformat){

    tempObj = {id : iter}
    tempObj['col1'] = time
    for (let s in resultReformat[time]){
        tempObj[stationCol[s]] = resultReformat[time][s]
    }
    resultReformat1.push(tempObj)
    iter += 1
    }
    return {rows : resultReformat1, columns : columns}
}

export { windDirLatestReadings, readWindDir, windDirLatest, updateWindDirDaily, updateWindDirMini, updateWindDir, windDirFormatted }