import bcrypt from 'bcrypt'

async function genPassword(password : string) : Promise<string> {
    const hash = await bcrypt.hash(password, 10)
    return hash
}

async function comparePassword(challengePassword : string, storedHash : string) : Promise<Boolean> {
    const result = await bcrypt.compare(challengePassword, storedHash)
    return result
}
// const hash = await bcrypt.hash('hi',10)
// console.log(hash)

// const result = await bcrypt.compare('hi', hash)
// console.log(result)

export {genPassword, comparePassword}