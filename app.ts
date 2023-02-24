require('dotenv').config()
require('./models')
require('./routers')
// require('./middleware')
require('./API/Cron')

// import { PrismaClient } from '@prisma/client'
// export const prisma = new PrismaClient()
// export = prisma