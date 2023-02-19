import { genPassword } from "../../middleware/authCore"

async function UserSeed () {
        return [
                { name: 'a', username : 'a', email : 'a', password: await genPassword('a'), routes:[], isAdmin:true},
                { name: 'Yewande', username : 'yewande', email: 'yewande@prisma.io', password: await genPassword('1'), routes:[] },
                { name: 'Angelique', username : 'angelique', email: 'angelique@prisma.io', password: await genPassword('1'), routes:[]},
                { name: 'Michel', username : 'michel', email : 'menion@here.com', password: await genPassword('1'), routes:[]},
                { name: 'admin', username : 'admin', email : 'admin', password: await genPassword('admin'), routes:[], isAdmin:true},
                
        ]
}

export {UserSeed}