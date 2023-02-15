import { updateAirTemp, updateAirTempDaily } from '../controllers/airtemp'
import { updateHumidity, updateHumidityDaily } from '../controllers/humidity'
import { updateWindDir, updateWindDirDaily } from '../controllers/winddir'
import { updateWindSpeed, updateWindSpeedDaily } from '../controllers/windspeed'
import { updateRain, updateRainDaily } from '../controllers/rainfall'
import { toLocaleISO } from './Datetime'

const cron = require('node-cron')
try{
    //  Cronjob for updating rain sensor data every 5 mins
    cron.schedule("20 */5 * * * *", function () {
        // console.log("---------------------");
        // console.log("updating rain sensors every 20th second of 5 mins");
        updateRain(10, 100)
        // console.log(toLocaleISO(new Date()))
    });
    //  Cronjob for updating 1 min sensor data
    cron.schedule("20 * * * * *", function () {
        // console.log("---------------------");
        // console.log("updating 1 min sensors every 20th second");
        updateAirTemp(5, 100)
        updateHumidity(5, 100)
        updateWindDir(5,100)
        updateWindSpeed(5,100)
        // console.log(toLocaleISO(new Date()))
    });
    // Cronjob for updating daily data at end of day
    cron.schedule("20 55 23 * * *", function () {
        // console.log("---------------------");
        // console.log("Daily update of all sensors to patch data");
        updateRainDaily()
        updateAirTempDaily()
        updateHumidityDaily()
        updateWindDirDaily()
        updateWindSpeedDaily()
        // console.log(toLocaleISO(new Date()))
    });

    console.log('cron-initialised!')
}
catch(e){
    console.log(e)
    console.log('cron failed!')
}

