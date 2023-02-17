import { airTempLatestReadings } from "./airtemp";
import { humidityLatestReadings } from "./humidity";
import { rainfallLatestReadings } from "./rainfall";
import { windDirLatestReadings } from "./winddir";
import { windSpeedLatestReadings } from "./windspeed";
import { stationsLatestReadings } from "./stations";

async function sendAllLatest () {
    const station = await stationsLatestReadings()
    const rainfall = await rainfallLatestReadings()
    const airtemp = await airTempLatestReadings()
    const humidity = await humidityLatestReadings()
    const winddir = await windDirLatestReadings()
    const windspeed = await windSpeedLatestReadings()
    const a = ({
        metadata : station,
        rainfall : rainfall,
        airtemp : airtemp,
        humidity : humidity,
        winddir : winddir,
        windspeed : windspeed
    })
    // console.log(a)
    return a
}

export { sendAllLatest }