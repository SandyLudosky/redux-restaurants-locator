export interface IRestaurant {
    id: string
    name: string
    rating: number
    price_level: number
    types: string[]
    opening_hours: {open_now: boolean}
    vincinity: string
}