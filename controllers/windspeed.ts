import { parseAPI, parseMetaData } from '../API/Parsers'
import { getWindSpeed } from '../API/Queries'
import { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler } from '../API/Datetime'
import prisma from './index'

async function windSpeedLatestReadings() {
    try{
        const windSpeed = await prisma.windspeed.findMany({
            where : {},
            orderBy : {timestamp : 'desc'} ,
            distinct: ['station_id'],
            select : {
              timestamp : true,
              station_id : true,
              value : true
            }
        })
        return windSpeed
    }
    catch(e){
        console.log(e)
    }
}

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

async function windSpeedFormatted(inputDate : any){
    const stations = await prisma.stations.findMany({
        where:{
        reading_unit : 'knots'
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
    const result = await prisma.windspeed.findMany({
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

export { windSpeedLatestReadings, readWindSpeed, windSpeedLatest, updateWindSpeedDaily, updateWindSpeedMini, updateWindSpeed, windSpeedFormatted }