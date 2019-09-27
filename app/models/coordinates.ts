export class Coordinate {
    longitude: number
    latitude: number
    constructor(values: any) {
      this.longitude = values.coords.longitude
      this.latitude = values.coords.latitude
    }
}