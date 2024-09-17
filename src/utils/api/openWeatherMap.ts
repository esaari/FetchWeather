import { KEY } from './key'
import { getFromEndpoint } from './apiHelpers';

// Note, was not able to get https://openweathermap.org/api/geocoding-api/ endpoint to work
const BASE_URI = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeather(locations) {
    for (const location of locations) {
        const queryParam= addCorrectParam(location);
        const locationInfo = await getFromEndpoint(BASE_URI, queryParam, KEY);
        printData(locationInfo);
    }
}

function addCorrectParam(location) {
    const zipRegEx = /^\d{5}$/;
    if (zipRegEx.test(location)) {
        return `/?zip=${ location }`;
    } else {
        location = location.split(',')
        return `/?q=${ location[0] },${ location[1].trim() }`;
    }
}

function printData(locationInfo) {
    console.log(`The current weather condition in ${locationInfo.name} is supposedly ${locationInfo.weather[0].main} with ${locationInfo.weather[0].description}`);
    console.log(`${locationInfo.name} has a Latitude of: ${locationInfo.coord.lat} and a Longitude of: ${locationInfo.coord.lon}\n`)
}