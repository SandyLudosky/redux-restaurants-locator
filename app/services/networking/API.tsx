import * as service from './networking'
import { Query, Paths } from './networking'
import { Coordinate } from '../../models/coordinates'

async function searchRestaurants(coordinates: Coordinate)  {
    const coords = `${coordinates.latitude},${coordinates.longitude}`
    return new Promise(async (resolve, reject) => { 
        try {
            let request = new Query(Paths.NEARBY_SEARCH, '', {location: coords,radius: 500, type: 'restaurant' })
            let response = await service.get(request)   
            let results = await getRestaurants(response)
            resolve(results)
        } catch(err) { reject(err)}
    })
}
function getRestaurants(data: any) {
    return data.results
}
export {
    searchRestaurants
}