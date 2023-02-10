import { PrismaClient } from '@prisma/client'
import { data } from './seed_data'
const prisma = new PrismaClient()
async function main() {
  // const alice = await prisma.user.upsert({
  //   where: { email: 'alice@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'alice@prisma.io',
  //     name: 'Alice',
  //     posts: {
  //       create: {
  //         title: 'Check out Prisma with Next.js',
  //         content: 'https://www.prisma.io/nextjs',
  //         published: true,
  //       },
  //     },
  //   },
  // })
  // const bob = await prisma.user.upsert({
  //   where: { email: 'bob@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //     posts: {
  //       create: [
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma',
  //           published: true,
  //         },
  //         {
  //           title: 'Follow Nexus on Twitter',
  //           content: 'https://twitter.com/nexusgql',
  //           published: true,
  //         },
  //       ],
  //     },
  //   },
  // })
  // console.log({ alice, bob })
  
}

async function createMany() {
  await prisma.user.createMany({
    data: data,
    skipDuplicates: true, // Skip 'Bobo'
  })
  console.log('Multiple Creation Completed!')
}
// main()
createMany()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// // CREATE Single Record
// const user = await prisma.user.create({
//     data: {
//       email: 'elsa@prisma.io',
//       name: 'Elsa Prisma',
//     },
//   })
// // CREATE MULTIPLE Records
// const createMany = await prisma.user.createMany({
//     data: [
//       { name: 'Bob', email: 'bob@prisma.io' },
//       { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
//       { name: 'Yewande', email: 'yewande@prisma.io' },
//       { name: 'Angelique', email: 'angelique@prisma.io' },
//     ],
//     skipDuplicates: true, // Skip 'Bobo'
//   })

// // READ
// // By unique identifier
// const user = await prisma.user.findUnique({
//     where: {
//       email: 'elsa@prisma.io',
//     },
//   })
//   // By ID
//   const user = await prisma.user.findUnique({
//     where: {
//       id: 99,
//     },
//   })
// // Find ALL within table
// const users = await prisma.user.findMany()
// // Find Filtered List
// const users = await prisma.user.findMany({
//     where: {
//       email: {
//         endsWith: 'prisma.io',
//       },
//     },
//   })
// // Find Most recently created
// const findUser = await prisma.user.findFirst({
//     where: {
//       posts: {
//         some: {
//           likes: {
//             gt: 100
//           }
//         }
//       }
//     },
//     orderBy: {
//       id: "desc"
//     }
//   })
// }

// // UPDATE Single
// const updateUser = await prisma.user.update({
//     where: {
//       email: 'viola@prisma.io',
//     },
//     data: {
//       name: 'Viola the Magnificent',
//     },
//   })
// // UPDATE Multiple
// const updateUsers = await prisma.user.updateMany({
//     where: {
//       email: {
//         contains: 'prisma.io',
//       },
//     },
//     data: {
//       role: 'ADMIN',
//     },
//   })
// // UPSERT (Update or Create if data does not exist)
// const upsertUser = await prisma.user.upsert({
//     where: {
//       email: 'viola@prisma.io',
//     },
//     update: {
//       name: 'Viola the Magnificent',
//     },
//     create: {
//       email: 'viola@prisma.io',
//       name: 'Viola the Magnificent',
//     },
//   })
// // UDPDATE NUMBER FIELDS USING ATOMIC OPERATORS

// // DELETE Single
// const deleteUser = await prisma.user.delete({
//     where: {
//       email: 'bert@prisma.io',
//     },
//   })
// //  DELETE Multiple
// const deleteUsers = await prisma.user.deleteMany({
//     where: {
//       email: {
//         contains: 'prisma.io',
//       },
//     },
//   })
// // DELETE ALL
// const deleteUsers = await prisma.user.deleteMany({})
// DELETE CASCADING -> Make relation optional in schema

// // TRANSACTIONS
// const deletePosts = prisma.post.deleteMany({
//     where: {
//       authorId: 7,
//     },
//   })
  
//   const deleteUser = prisma.user.delete({
//     where: {
//       id: 7,
//     },
//   })
  
//   const transaction = await prisma.$transaction([deletePosts, deleteUser])

// // RAW SQL (Truncate)
// const tablenames = await prisma.$queryRaw<
//   Array<{ tablename: string }>
// >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

// const tables = tablenames
//   .map(({ tablename }) => tablename)
//   .filter((name) => name !== '_prisma_migrations')
//   .map((name) => `"public"."${name}"`)
//   .join(', ')

// try {
//   await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
// } catch (error) {
//   console.log({ error })
// }