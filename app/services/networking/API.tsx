import * as service from './networking'
import { Query, Paths } from './networking'

async function searchRestaurants()  {
    return new Promise(async (resolve, reject) => { 
        try {
            let request = new Query(Paths.NEARBY_SEARCH, '', {location:'-33.8670522,151.1957362',radius: 500, types: 'food', name:'harbour' })
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