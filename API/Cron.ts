import { updateAirTemp, updateAirTempDaily } from '../controllers/airtemp'
import { updateHumidity, updateHumidityDaily } from '../controllers/humidity'
import { updateWindDir, updateWindDirDaily } from '../controllers/winddir'
import { updateWindSpeed, updateWindSpeedDaily } from '../controllers/windspeed'
import { updateRain, updateRainDaily } from '../controllers/rainfall'
import { toLocaleISO } from './Datetime'

const cron = require('node-cron')
try{
    //  Cronjob for updating rain sensor data every 5 mins
    cron.schedule("20 */5 * * * *", async function () {
        try{
            // console.log("---------------------");
            // console.log("updating rain sensors every 20th second of 5 mins");
            await updateRain(10, 100)
            // console.log(toLocaleISO(new Date()))
        }
        catch(e){
            console.log(e)
        }
        try{
            await updateAirTemp(5, 100)
        }catch(e){
            console.log(e)
        }
        try{
            await updateHumidity(5, 100)
        }catch(e){
            console.log(e)
        }
        try{
            await updateWindDir(5,100)
        }catch(e){
            console.log(e)
        }
        try{
            await updateWindSpeed(5,100)
        }catch(e){
            console.log(e)
        }
        
    });
    //  Cronjob for updating 1 min sensor data
    // cron.schedule("20 * * * * *", async function () {
    //     try{
    //         // console.log("---------------------");
    //         // console.log("updating 1 min sensors every 20th second");
    //         await updateAirTemp(5, 100)
    //         await updateHumidity(5, 100)
    //         await updateWindDir(5,100)
    //         await updateWindSpeed(5,100)
    //         // console.log(toLocaleISO(new Date()))
    //     }
    //     catch(e){
    //         console.log(e)
    //     }
    // });
    // Cronjob for updating daily data at end of day
    cron.schedule("20 55 23 * * *", async function () {
        try{
            // console.log("---------------------");
            // console.log("Daily update of all sensors to patch data");
            await updateRainDaily()
            await updateAirTempDaily()
            await updateHumidityDaily()
            await updateWindDirDaily()
            await updateWindSpeedDaily()
            // console.log(toLocaleISO(new Date()))
        }
        catch(e){
            console.log(e)
        }
        
    });

    console.log('cron-initialised!')
}
catch(e){
    console.log(e)
    console.log('cron failed!')
}

