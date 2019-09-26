export interface IRestaurant {
    id: string
    name:string
    opening_hours: { open_now: boolean }
    price_level: number
    rating: number
    vicinity: string
}