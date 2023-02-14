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

async function read(params : any) {
    try{
        const user = await prisma.stations.findMany({
            where : params
        })
        // console.log(user)
        return user
    }
    catch(e){
        console.log(e)
    }
}
// module.exports = { read }
export = read
// export * as stationController 