import express from 'express'
const cors = require('cors')
const app = express()
import read from '../controllers/stations'
import { readRainfall, rainfallLatest } from '../controllers/rainfall'
// const read = require('../controllers/stations')
// import prisma from '../app'

const corsConfig = {
    credentials: true,
    origin: true,
};
// Middleware
app.use(cors(corsConfig))
app.use(express.json())

// ... your REST API routes will go here
// app.get('/', find)
app.get('/', (req, res) => {
    res.send('Hello')
})

// async function r1 = 
app.get('/stations', async (req, res) => {
    try{
        const result = await read({})
        res.json(result)
    }
    catch(e){
        res.sendStatus(500)
    }
    
    
})

app.get('/rainfall', async (req, res) => {
    try{
        const result = await readRainfall({})
        res.json(result)
    }
    catch(e){
        res.sendStatus(500)
    }
})
app.get('/rainfallnow', async (req, res) => {
    try{
        const result = await rainfallLatest()
        res.json(result)
    }
    catch(e){
        res.sendStatus(500)
    }
})

// console.log(read({}))

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(`REST API server ready at: http://localhost:${process.env.EXPRESS_PORT}`),
)