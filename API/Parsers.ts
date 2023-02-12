function parseAPI(readings:any) {
  interface StationData {
    'timestamp' : string;
    'station_id' : string;
    'value' : number
  }
  let productArr : StationData[]
  productArr = []
  readings.items.forEach((element : any) => {
    element.readings.forEach((element1 : any) => {
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


export { parseAPI, parseMetaData }