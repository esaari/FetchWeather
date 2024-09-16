import { getFromEndpoint } from "./apiHelpers";

// Note, was not able to get https://openweathermap.org/api/geocoding-api/ endpoint to work
const BASE_URI = 'https://api.openweathermap.org/data/2.5/weather';
const COUNTRY_CODE = 'US';

export async function getWeather(locations) {
    let queryParam = '';
    locations.forEach((location) => {
            const zipRegEx = /^\d{5}$/;
            if (zipRegEx.test(location)) {
                queryParam = `/?zip=${ location }`;
            } else {
                location = location.split(',')
                queryParam = `/?q=${ location[0] },${ location[1].trim() },${COUNTRY_CODE}`;
            }
        getFromEndpoint(BASE_URI, queryParam)
    })
}
