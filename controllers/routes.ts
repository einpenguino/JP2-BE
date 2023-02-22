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

async function findRoutes(id : any){
    try{
        const user = await prisma.places.findFirst({
            where:{
                user_fk : id
            },
            include:{

            }
        })
        return user
    }catch(e){
        console.log(e)
    }
}

export {createRoute, findRoutes}