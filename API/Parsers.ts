function parseAPI(readings:any) {
  interface StationData {
    'timestamp' : string;
    'station_id' : string;
    'value' : number
  }
  let productArr : StationData[]
  productArr = []
  readings.items.map((element : any) => {
    element.readings.map((element1 : any) => {
      productArr.push({
          'timestamp': element.timestamp,
          'station_id': element1.station_id,
          'value': isNaN(element1.value) ? null : element1.value
        })
    }
    )
  })
  return productArr
}

function parseMetaData(readings : any){
  interface stationsMetadata {
    device_id: string,
    name: string,
    latitude: number,
    longitude: number,
    reading_type: string,
    reading_unit: string
  }
  let stationsMet : stationsMetadata[]
  stationsMet=[]
  readings.metadata.stations.map((ele : any) => {
    stationsMet.push({
      device_id:ele.device_id,
      name: ele.name,
      latitude: ele.location.latitude,
      longitude: ele.location.latitude,
      reading_type: readings.metadata.reading_type,
      reading_unit: readings.metadata.reading_unit
    })
  })
  return stationsMet
}

function toLocaleISO(date : string) {
  let d : Date
  d = new Date(date)
  let dateArr : string[]
  dateArr = d.toLocaleDateString('en-GB').split('/')
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}T${d.toLocaleTimeString('en-GB', {hour12:false})}`
}

function toLocaleQueryDate(date : string){
  let d : Date
  d = new Date(date)
  let dateArr : string[]
  dateArr = d.toLocaleDateString('en-GB').split('/')
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
}

export { parseAPI, parseMetaData, toLocaleISO, toLocaleQueryDate }

// () => {
//   let result : any
//   let d : any
//   let d1 : any
//   let locale : any
//   let option : any
//   let localeString : any
  
//   // locale = {
//   //   nu : ''
//   // }
//   option = {
//     'dateStyle' : 'short',
//     'timeStyle' : 'long',
//     // calendar : 'iso8601',
//     'timeZone' : "Asia/Singapore"
//   }
//   localeString = {
//     year:'numeric',
//     month:'numeric',
//     day:'numeric',
//     hour:'numeric',
//     minute:'numeric',
//     second:'numeric',
//     hour12:false
//     // fractionalSecondDigits: 3
//   }


//   result = await rainfallLatest()
//   console.log(toLocaleISO(result.timestamp))
//   console.log(toLocaleQueryDate(result.timestamp))
//   // d = new Date(result.timestamp)
//   // let dateArr : string[]
//   // dateArr = d.toLocaleDateString('en-GB').split('/')
//   // console.log(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}T${d.toLocaleTimeString('en-GB', {hour12:false})}`)
//   // console.log(d.toLocaleDateString('en-GB').split('/'))
//   // console.log(d.toLocaleTimeString('en-GB', {hour12:false}))
//   // // console.log(d.toLocaleString([], {}))
//   // console.log(new Intl.DateTimeFormat('en-GB', localeString).format(d).replaceAll('/', '-'))

//   // d1 = new Date(d)
//   // console.log(new Intl.DateTimeFormat('iso', option).format(d))
//   // console.log(new Date(d
//   //     .toLocaleString()
//   // ).toISOString())
// }