import axios from 'axios'
const baseURI = 'https://api.data.gov.sg/v1/environment/'

async function getRainfall(query : string) {
    try{
        let res = await axios.get(`${baseURI}rainfall?${query}`)
        return res
    }
    catch(e){
        console.log(e)
    }
}

async function getAirTemp(query : string) {
    try{
        let res = await axios.get(`${baseURI}air-temperature?${query}`)
        return res
    }
    catch(e){
        console.log(e)
    }
}

async function getHumidity(query : string) {
    try{
        let res = await axios.get(`${baseURI}relative-humidity?${query}`)
        return res
    }
    catch(e){
        console.log(e)
    }
}

async function getWindDir(query : string) {
    try{
        let res = await axios.get(`${baseURI}wind-direction?${query}`)
        return res
    }
    catch(e){
        console.log(e)
    }
}

async function getWindSpeed(query : string) {
    try{
        let res = await axios.get(`${baseURI}wind-speed?${query}`)
        return res
    }
    catch(e){
        console.log(e)
    }
}

export { getRainfall, getAirTemp, getHumidity, getWindSpeed, getWindDir }