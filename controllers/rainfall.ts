const httpstatus = require('http-status')
// import httpstatus from 'http-status'
import { parseAPI, parseMetaData } from '../API/Parsers'
import { getRainfall } from '../API/Queries'
import { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler } from '../API/Datetime'
import prisma from './index'

async function rainfallLatestReadings () {
    try{
        const rainfall = await prisma.rainfall.findMany({
            where : {},
            orderBy : {timestamp : 'desc'} ,
            distinct: ['station_id'],
            select : {
              timestamp : true,
              station_id : true,
              value : true
            }
        })
        return rainfall
    }
    catch(e){
        // console.log(e)
        throw `ReadRainfall Error : ${e}`
    }
    
}

async function readRainfall(datetime : any) {
    try{

        const result = await prisma.rainfall.findMany({
            where : {
              timestamp : {
                gte : new Date(datetime)
              },
            },
            select : {
              timestamp: true,
              station_id : true,
              value : true
            },
            orderBy : {
              station_id:'asc'
            },
            // take : 10000
           })
           console.log(result)
           let resultFormat : any
           resultFormat = {}
           result.map((ele) : any => {
            // resultFormat{
            let localeISO=toLocaleISO(ele.timestamp)
            if (!(localeISO in resultFormat)){
              resultFormat[localeISO] = [{
                'station' : ele.station_id,
                'value' : ele.value
              }]
            }else{
              resultFormat[localeISO].push({
                'station' : ele.station_id,
                'value' : ele.value
              })
            }
        
            // }
           }
        )
        return resultFormat
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
        return result
    }
    catch(e){
        console.log(e)
    }
}

async function updateRainDaily() {
    let a = new Date()
    let b : any
    let c : any
    b = await rainfallLatest()
    c = await getDailyScheduler(b.timestamp)
    // console.log(c)
    for (let d of c){
      try{
        let res : any
        res = await getRainfall(`date=${d}`)
        let json = await parseAPI(res.data)
        let stations = await parseMetaData(res.data)
        await prisma.rainfall.createMany({
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

async function updateRainMini() {
    let a = new Date()
    let b : any
    let c : any
    b = await rainfallLatest()
    c = miniScheduler(b.timestamp, new Date(), 5, 10)
    // console.log(c)
    for (let d of c){
      try{
        let res : any
        res = await getRainfall(`date_time=${d}`)
        let json = await parseAPI(res.data)
        let stations = await parseMetaData(res.data)
        await prisma.rainfall.createMany({
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

async function updateRain(delay : number, threshold : number) {
    let a = new Date()
    let b : any
    let c : any
    b = await rainfallLatest()
    if (a.getTime() - b.timestamp.getTime() > delay * 60 * 1e3 * threshold) {
        // Initiate Daily seeding instead of instantaneous
        c = getDailyScheduler(b.timestamp)
        // console.log(c)
        for (let d of c){
        try{
            let res : any
            res = await getRainfall(`date=${d}`)
            let json = await parseAPI(res.data)
            let stations = await parseMetaData(res.data)
            await prisma.rainfall.createMany({
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
        c = miniScheduler(b.timestamp, new Date(), 5, 10)
        // console.log(c)
        for (let d of c){
        try{
            let res : any
            res = await getRainfall(`date_time=${d}`)
            let json = await parseAPI(res.data)
            let stations = await parseMetaData(res.data)
            await prisma.rainfall.createMany({
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

async function rainfallFormatted (inputDate : any) {
    const stations = await prisma.stations.findMany({
        where:{
        reading_unit : 'mm'
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
    const result = await prisma.rainfall.findMany({
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

export { rainfallLatestReadings, readRainfall, rainfallLatest, updateRainDaily, updateRainMini, updateRain , rainfallFormatted}