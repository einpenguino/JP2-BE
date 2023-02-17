// require('dotenv').config()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function genPassword(password : string) : Promise<string> {
    const hash = await bcrypt.hash(password, 10)
    return hash
}

async function comparePassword(challengePassword : string, storedHash : string) : Promise<Boolean> {
    const result = await bcrypt.compare(challengePassword, storedHash)
    return result
}

async function signJWT (data : any){
    let secret : any
    secret = process.env.JWT_SECRET
    return await jwt.sign(data, secret)
    // console.log(process.env.JWT_SECRET)
}
// const hash = await bcrypt.hash('hi',10)
// console.log(hash)

// const result = await bcrypt.compare('hi', hash)
// console.log(result)

export {genPassword, comparePassword, signJWT}