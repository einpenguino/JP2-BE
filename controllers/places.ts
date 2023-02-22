import prisma from './index'

// async function assignFavPlaceToUser(placeData : any, username : string) => {
//     try{
//       const places = await prisma.places.findFirstOrThrow({
//         where : {
//           id: 1
//         },
//         include:{
//           user_fk: {
//             select:{
//               username:true
//             }
//           }
//         }
//       })
//       console.log(places)
//     }catch(e) {
//         console.log(e)
// }

async function createPlace(data : any) {
    try{
        await prisma.places.createMany({
            data : data,
            skipDuplicates:true
        })
    }catch(e){
        console.log(e)
    }
}

async function findAddress(address : any){
    try{
        const user = await prisma.places.findFirst({
            where:{
                address : address
            }
        })
        return user
    }catch(e){
        console.log(e)
    }
}

export { createPlace, findAddress}