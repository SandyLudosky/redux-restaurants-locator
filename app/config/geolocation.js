import Geolocation from '@react-native-community/geolocation';

const config = {
    skipPermissionRequests: false, 
    authorizationLevel: "whenInUse"
}

const getCurrentPosition = () => {
    Geolocation.setRNConfiguration(config);
    Geolocation.requestAuthorization();
    return new Promise(async (resolve, reject) => { 
        Geolocation.getCurrentPosition((position, error) => {
            if(!error) {resolve(position)
            } else {
                const errorDescription = JSON.stringify(error);
                console.log('Error '+ errorDescription)
                reject('Error '+ errorDescription )
            }
        });
    })
}
export {
    getCurrentPosition
}