import { readRainfall, rainfallLatest } from '../controllers/rainfall'
import { parseAPI, parseMetaData } from './Parsers'
import { getRainfall } from './Queries'
import { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler } from './Datetime'
import prisma from '../controllers/index'

// Data Availability
// Rainfall - 5 mins resolution, latest entry is at least 10 min before
// Everything else - 1 min resolution, latest enttry is 5 min before, must be exact timing or does not return full list

// async function updateRainDaily() {
//     let a = new Date()
//     let b : any
//     let c : any
//     b = await rainfallLatest()
//     c = await getDailyScheduler(b.timestamp)
//     console.log(c)
//     for (let d of c){
//       try{
//         let res : any
//         res = await getRainfall(`date=${d}`)
//         let json = await parseAPI(res.data)
//         let stations = await parseMetaData(res.data)
//         await prisma.rainfall.createMany({
//           data : json,
//           skipDuplicates: true,
//         })
//         await prisma.stations.createMany({
//             data:stations,
//             skipDuplicates: true
//         })
//       }
//       catch(e){
//         console.log(e)
//       }
      
//     }
// }

// async function updateRainMini() {
//     let a = new Date()
//     let b : any
//     let c : any
//     b = await rainfallLatest()
//     c = miniScheduler(b.timestamp, new Date(), 5, 10)
//     console.log(c)
//     for (let d of c){
//       try{
//         let res : any
//         res = await getRainfall(`date_time=${d}`)
//         let json = await parseAPI(res.data)
//         let stations = await parseMetaData(res.data)
//         await prisma.rainfall.createMany({
//           data : json,
//           skipDuplicates: true,
//         })
//         await prisma.stations.createMany({
//             data:stations,
//             skipDuplicates: true
//         })
//       }
//       catch(e){
//         console.log(e)
//       }
      
//     }
// }

// async function updateRain(delay : number, threshold : number) {
//     let a = new Date()
//     let b : any
//     let c : any
//     b = await rainfallLatest()
//     if (a.getTime() - b.timestamp.getTime() > delay * 60 * 1e3 * threshold) {
//         // Initiate Daily seeding instead of instantaneous
//         c = getDailyScheduler(b.timestamp)
//         console.log(c)
//         for (let d of c){
//         try{
//             let res : any
//             res = await getRainfall(`date=${d}`)
//             let json = await parseAPI(res.data)
//             let stations = await parseMetaData(res.data)
//             await prisma.rainfall.createMany({
//                 data : json,
//                 skipDuplicates: true,
//             })
//             await prisma.stations.createMany({
//                 data:stations,
//                 skipDuplicates: true
//             })
//         }
//         catch(e){
//             console.log(e)
//         }
//     }
//     }
//     else {
//         // Use Mini updating
//         c = miniScheduler(b.timestamp, new Date(), 5, 10)
//         console.log(c)
//         for (let d of c){
//         try{
//             let res : any
//             res = await getRainfall(`date_time=${d}`)
//             let json = await parseAPI(res.data)
//             let stations = await parseMetaData(res.data)
//             await prisma.rainfall.createMany({
//                 data : json,
//                 skipDuplicates: true,
//             })
//             await prisma.stations.createMany({
//                 data:stations,
//                 skipDuplicates: true
//             })
//         }
//         catch(e){
//             console.log(e)
//         }
//         }
//     }
    
// }

// export { updateRainDaily, updateRainMini, updateRain }