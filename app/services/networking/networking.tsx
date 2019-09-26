 const Constants = {
    BASE_URL: 'https://maps.googleapis.com/maps/api/place/',
    API_KEY: 'AIzaSyCZ5SVtP6EJhcv741ZbJA7oEJHuPOWFSwQ'
}

const Paths = {
    NEARBY_SEARCH: 'nearbysearch/json'
}
//returns a string to build the URL with parameters
function uriParams(parameters={} ) {
    return Object.keys(parameters)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent((parameters as any)[k] ))
        .join('&');
}
class Query {
    path: string
    filterOptions?: {}
    query?: string
    constructor(path: string, query?: string , options={}) {
      this.path = path;
      this.filterOptions = options;
      this.query = query;
    }
    url = ():string => {
        return Constants.BASE_URL
               +this.path
               +'?key='+Constants.API_KEY
               +'&'+uriParams(this.filterOptions)
    }
}
const get = (withQuery: Query) => {
    return new Promise((resolve, reject) => {
        console.log(withQuery.url())
        fetch(withQuery.url()).then(response => {
            if (!response.ok) { throw Error(response.statusText)  }
             resolve(response.json())
          }).catch(e => reject(e))
    })
}
export {
    Constants, 
    Paths, 
    Query,
    get
}