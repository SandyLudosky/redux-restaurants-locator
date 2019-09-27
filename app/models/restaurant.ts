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
    location: {
        lat: number
        lng: number
      }
    viewport: {
        northeast: {
            lat: number
            lng: number
        },
        southwest: {
            lat: number
            lng: number
        }
    } 
}