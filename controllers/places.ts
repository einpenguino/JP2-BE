import prisma from './index'

async function assignFavPlaceToUser(placeData : any, username : string) => {
    try{
      const places = await prisma.places.findFirstOrThrow({
        where : {
          id: 1
        },
        include:{
          user_fk: {
            select:{
              username:true
            }
          }
        }
      })
      console.log(places)
    }catch(e) {
        console.log(e)
}