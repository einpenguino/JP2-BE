import prisma from './index'
import { genPassword } from '../middleware/authCore'

interface createUserForm {
    name : string,
    email : string,
    username : string,
    password : string
}
async function findUserOrThrow (username : string) {
    try{
        const user = await prisma.user.findFirstOrThrow({
          where:{
            username:username
          },
          select:{
            id: true,
            email:true,
            password: true,
            routes: true,
            isAdmin: true
          }
        })
        // console.log(user)
        return user
      }catch(e) {
        // console.log(e)
        return false
      }
}

async function createUser(data : createUserForm) {
    try {
        const { name, email, username, password } = data
        const user = await prisma.user.create({
            data : {
                name : name,
                email : email,
                username : username,
                password : await genPassword(password)
            }
        })
        return user
    }catch(e){
        return false
    }
}

export {findUserOrThrow, createUser}