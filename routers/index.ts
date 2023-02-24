import express from 'express'
const cors = require('cors')
const app = express()
// const cookieParser = require('cookie-parser')
// import read from '../controllers/stations'
import { stationsLatestReadings } from '../controllers/stations'
import { readRainfall, rainfallLatest, rainfallFormatted } from '../controllers/rainfall'
import { humidityFormatted } from '../controllers/humidity'
import { airTempFormatted } from '../controllers/airtemp'
import { windDirFormatted } from '../controllers/winddir'
import { windSpeedFormatted } from '../controllers/windspeed'
import { sendAllLatest } from '../controllers/combination'
import { challengeLogin } from '../controllers/userCreds'
import { signJWT } from '../middleware/authCore'
import { createUser } from '../controllers/user'
import jwt from 'jsonwebtoken'
import prisma, { winddir } from '../controllers'
import { auth } from '../middleware/authMiddleware'
import { findUserOrThrow } from '../controllers/user'
import { createPlace, findAddress } from '../controllers/places'
import { createRoute, findRoutes } from '../controllers/routes'
import { create } from 'domain'

const corsConfig = {
    credentials: true,
    origin: true,
};
// Middleware
app.use(cors(corsConfig))
// app.use(cors())
app.use(express.json())
// app.use(cookieParser())

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

app.post('/rainfall', async (req, res) => {
    try{
        // const result = await readRainfall(req.body.datetime)
        const result = await rainfallFormatted(req.body.datetime)
        res.status(200).json(result)
    }
    catch(e){
        res.sendStatus(500)
    }
})

app.post('/humidity', async (req, res) => {
    try{
        // const result = await readRainfall(req.body.datetime)
        const result = await humidityFormatted(req.body.datetime)
        res.status(200).json(result)
    }
    catch(e){
        res.sendStatus(500)
    }
})

app.post('/airtemp', async (req, res) => {
    try{
        // const result = await readRainfall(req.body.datetime)
        const result = await airTempFormatted(req.body.datetime)
        res.status(200).json(result)
    }
    catch(e){
        res.sendStatus(500)
    }
})

app.post('/winddir', async (req, res) => {
    try{
        // const result = await readRainfall(req.body.datetime)
        const result = await windDirFormatted(req.body.datetime)
        res.status(200).json(result)
    }
    catch(e){
        res.sendStatus(500)
    }
})

app.post('/windspeed', async (req, res) => {
    try{
        // const result = await readRainfall(req.body.datetime)
        const result = await windSpeedFormatted(req.body.datetime)
        res.status(200).json(result)
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
        // console.log(req.body)
        const {username, password} = req.body
        const user = await challengeLogin(username, password)
        if (user){
            let token = signJWT({username: user.username})
            // res.cookie('JP2', signJWT({username: user.username}), {maxAge:60000*60*24})
            // res.cookie('JP2', token, {httpOnly:true,maxAge:60000*60*24})
            // console.log(token)
            res.status(200).cookie('JP2', signJWT({username: user.username}), {maxAge:60000*60*24}).json(user)
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
        console.log('logout-triggered!')
        res.clearCookie('JP2')
        res.sendStatus(200)
    }catch(e) {
    //   console.log(e)
      res.send(500).send('Logout Failed')
    }
})

app.post('/favplace', async (req, res) => {
    console.log(req.body)
    try{
        // console.log(req.headers)
        console.log(req.body)
        if(req.headers.cookie){
            let decoded = await auth(req, res)
            console.log(decoded)
            let user : any
            user = await findUserOrThrow(decoded.username)
            console.log(user)
            let { start, end } = req.body
            // console.log({address : start.address, latitude : start.lat, longitude : start.lng})
            await createPlace([{address : start.address, latitude : start.lat, longitude : start.lng}])
            await createPlace([{address : end.address, latitude : end.lat, longitude : end.lng}])
            const start_id = await findAddress(start.address)
            const end_id = await findAddress(end.address)
            await createRoute([{start_id : start_id?.id, end_id : end_id?.id, user_fk : user?.id}])
            res.sendStatus(200)
        }else{
            res.status(401).send('Need to log in!')
        }
    }catch(e) {
      console.log(e)
      res.status(500).send('Need to log in to favourite place!')
    }
})

app.post('/getfavroutes', async (req, res) => {
    try{
        let routes = await findRoutes(req.body.username)
        res.status(200).json(routes)
    }catch(e){
        res.sendStatus(500)
    }
})

app.post('/getuserdetails', async (req, res) => {

})


app.listen(process.env.EXPRESS_PORT, () =>
  console.log(`REST API server ready at: http://localhost:${process.env.EXPRESS_PORT}`),
)