import { genPassword } from "../middleware/hashing"

async function UserSeed () {
        return [
                { name: 'Bob', email: 'bob@prisma.io', password: await genPassword('1') },
                { name: 'Bobo', email: 'bob@prisma.io', password: await genPassword('1') }, // Duplicate unique key!
                { name: 'Yewande', email: 'yewande@prisma.io', password: await genPassword('1') },
                { name: 'Angelique', email: 'angelique@prisma.io', password: await genPassword('1')},
                { name: 'Michel', email : 'menion@here.com', password: await genPassword('1')},
                { name: 'admin', email : 'admin', password: await genPassword('admin')}
        ]
}

export {UserSeed}