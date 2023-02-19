import express from 'express'
const cors = require('cors')
const app = express()
// import read from '../controllers/stations'
import { stationsLatestReadings } from '../controllers/stations'
import { readRainfall, rainfallLatest } from '../controllers/rainfall'
import { sendAllLatest } from '../controllers/combination'
import { challengeLogin } from '../controllers/userCreds'
import { signJWT } from '../middleware/authCore'
import { createUser } from '../controllers/user'
import jwt from 'jsonwebtoken'
import prisma from '../controllers'

const corsConfig = {
    credentials: true,
    origin: true,
};
// Middleware
app.use(cors(corsConfig))
app.use(express.json())

// ... your REST API routes will go here
app.get('/stations', async (req, res) => {
    try{
        const result = await stationsLatestReadings()
        res.json(result)
    }
    catch(e){
        res.sendStatus(500)
    }
})

app.get('/rainfall', async (req, res) => {
    try{
        console.log(req.query)
        res.sendStatus(200)
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

app.get('/latest', async (req, res) => {
    try{
        const result = await sendAllLatest()
        // console.log('latest called!')
        res.json(result)
    }
    catch(e){
        res.sendStatus(500)
    }
})

app.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body
        const user = await challengeLogin(username, password)
        if (user){
            // res.cookie('JP2', await signJWT({id: user.id}), {maxAge:60000*60*24})
            res.cookie('JP2', await signJWT({id: user.id}), {httpOnly:true,maxAge:60000*60*24})
            res.status(200).json(user)
        }else{
            res.status(500).send('Invalid Username or Password!')
        }
    }catch(e){
        res.status(500).send('Invalid Input parameters!')
    }
})

app.post('/signup', async (req, res) => {
    try{
        let user : any
        user = await createUser(req.body)
        console.log(user)
        delete user.password
        if(user){
            res.status(200).json(user)
        }else{
            res.status(500).send('User Creation Failed!')
        }
    }catch(e){
        res.status(500).send('Invalid Input parameters!')
    }
})

app.delete('/logout', (req, res) => {
    try{
        res.clearCookie('JP2')
        res.sendStatus(200)
    }catch(e) {
    //   console.log(e)
      res.send(500).send('Logout Failed')
    }
})

app.post('/faveplace', (req, res) => {
    try{
        let a = req.headers.cookie
        console.log(a)
        console.log('hi')
        // const {address, lat, lng} = req.body
        res.sendStatus(200)
    }catch(e) {
      console.log(e)
      res.status(500).send('Need to log in to favourite place!')
    }
})


app.listen(process.env.EXPRESS_PORT, () =>
  console.log(`REST API server ready at: http://localhost:${process.env.EXPRESS_PORT}`),
)