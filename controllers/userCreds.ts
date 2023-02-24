import prisma from './index'
// import jwt from 'jsonwebtoken'
import { findUserOrThrow } from './user'
import { genPassword, comparePassword } from '../middleware/authCore'

async function challengeLogin (username : string, password : string) {
    try{
        let user : any
        user = await findUserOrThrow(username)
        if (user) {
            // const checkPassword = await comparePassword(password, user.password)
            if (await comparePassword(password, user.password)){
                delete user.password
                return user
            }else{
                // Wrong Password
                return false
            }
        }else{
            // User Does not exist
            return false
        }

    }catch(e) {
        // any other failure (Invalid Input etc)
      console.log(e)
      return false
    }
}

async function checkLoggedIn (username : string, password : string) {
    try{
        let user : any
        user = await findUserOrThrow(username)
        if (user) {
            // const checkPassword = await comparePassword(password, user.password)
            if (await comparePassword(password, user.password)){
                delete user.password
                return user
            }else{
                // Wrong Password
                return false
            }
        }else{
            // User Does not exist
            return false
        }

    }catch(e) {
        // any other failure (Invalid Input etc)
      console.log(e)
      return false
    }
}

export {challengeLogin, checkLoggedIn}