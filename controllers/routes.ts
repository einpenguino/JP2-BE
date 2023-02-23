import { errorMonitor } from 'events'
import prisma from './index'


async function createRoute(data : any) {
    try{
        await prisma.routes.createMany({
            data : data,
            skipDuplicates:true
        })
    }catch(e){
        console.log(e)
    }
}

async function findRoutes(username : any){
    try{
        const user = await prisma.user.findFirstOrThrow({
            where:{
                username: username
            },
            include:{
              routes_rel:true
            }
           })
        //    console.log(user)
           const routes = await prisma.routes.findMany({
            where: {
              user_fk : user.id
            },
            select : {
              start_rel : true,
              end_rel : true,
            //   user_rel : {
            //     select : {
            //       username : true,
            //     //   routes : true
            //     }
            //   }
            }
           })
        return routes
    }catch(e){
        // console.log(e)
        throw (`Find routes failed : ${e}`)
    }
}

export {createRoute, findRoutes}