import got from 'got';
import { KEY } from './key';

export async function getFromEndpoint(uri, params) {
    console.log(encodeURI(uri + params + `&appid=${ KEY }`));
    try {
        const response = await got(encodeURI (uri + params + `&appid=${ KEY }`), {
            responseType: 'json',
        });
        printData(response.body);
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
    }
}

export function printData(responseData) {
    console.log(`The current weather condition in ${responseData.name} are supposedly ${responseData.weather[0].main} with ${responseData.weather[0].description}`);
    console.log(`${responseData.name} has a Latitude of: ${responseData.coord.lat} and a Longitude of: ${responseData.coord.lon}\n`)
}