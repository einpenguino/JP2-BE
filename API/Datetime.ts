
function toLocaleISO(date : string | Date) {
    let d : Date
    d = new Date(date)
    let dateArr : string[]
    dateArr = d.toLocaleDateString('en-GB').split('/')
    return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}T${d.toLocaleTimeString('en-GB', {hour12:false})}`
}
  
function toLocaleQueryDate(date : string | Date | any){
    let d : Date
    d = new Date(date)
    let dateArr : string[]
    dateArr = d.toLocaleDateString('en-GB').split('/')
    return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
}

function getDailyScheduler(start : Date){
    let currentTime = new Date()
    let endToday = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())
    let startTime : any
    let dateArr : string[]
    startTime = new Date(start).getTime()
    dateArr = []
    console.log(currentTime.getFullYear(), currentTime.getMonth(), (currentTime.getDate()))
    console.log(start)
    console.log(endToday)
    while (startTime < endToday.getTime()) {
        dateArr.push(toLocaleQueryDate(startTime))
        startTime += 24 * 60 * 60 * 1e3
    }
    if (!dateArr.includes(toLocaleQueryDate(endToday))){
        dateArr.push(toLocaleQueryDate(endToday))
    }
    // dateArr.push(toLocaleQueryDate(startTime))
    // console.log(dateArr)
    return dateArr
}

function miniScheduler(dbstart : Date, currentTime : Date, step : number, delay : number){
    // let currentTime = new Date()
    if (currentTime.getTime() - dbstart.getTime() < delay * 60 * 1e3){
        return []
    }
    let endTime = new Date(currentTime.getTime() - delay * 60 * 1e3).setSeconds(0)
    let iterTime : number
    let dateArr : string[]
    iterTime = new Date(dbstart).getTime()
    dateArr = []
  
    while (iterTime < endTime) {
        iterTime += step * 60 * 1e3
        if (iterTime <= endTime) dateArr.push(toLocaleISO(new Date(iterTime)))
      }
        
    return dateArr
  }

export { toLocaleISO, toLocaleQueryDate, getDailyScheduler, miniScheduler }