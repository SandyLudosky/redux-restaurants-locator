export interface IRestaurant {
    geometry: Geometry
    id: string
    name: string
    rating: number
    price_level: number
    types: string[]
    opening_hours: {open_now: boolean}
    vincinity: string
}

export interface Geometry {
    location: any;
    geometry: {
          location: {
            lat: number
            lng: number
          }
    }
}