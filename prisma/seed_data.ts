import { genPassword } from "../middleware/authCore"

async function UserSeed () {
        return [
                { name: 'Bob', username : 'bob', email: 'bob@prisma.io', password: await genPassword('1'), routes:[] },
                // { name: 'Bobo', email: 'bob@prisma.io', password: await genPassword('1'), routes:[] }, // Duplicate unique key!
                { name: 'Yewande', username : 'yewande', email: 'yewande@prisma.io', password: await genPassword('1'), routes:[] },
                { name: 'Angelique', username : 'angelique', email: 'angelique@prisma.io', password: await genPassword('1'), routes:[]},
                { name: 'Michel', username : 'michel', email : 'menion@here.com', password: await genPassword('1'), routes:[]},
                { name: 'admin', username : 'admin', email : 'admin', password: await genPassword('admin'), routes:[], isAdmin:true}
        ]
}

export {UserSeed}