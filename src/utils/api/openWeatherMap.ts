import { KEY } from './key'
import { getFromEndpoint } from './apiHelpers';

// Base URI for OpenWeather API
const BASE_URI = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetches weather data for a list of locations.
 * @param locations - Array of location strings (zip codes or "City, State").
 * @param fetcher - Optional function to fetch data from an endpoint.
 */
export async function getWeather(
    locations: string[],
    fetcher: typeof getFromEndpoint = getFromEndpoint
) {
    for (const location of locations) {
        try {
            const queryParam = addCorrectParam(location);
            const locationInfo = await fetcher(BASE_URI, queryParam, KEY);
            printData(locationInfo);
        } catch (error: any) {
            console.error(`Failed to fetch data for ${location}: ${error.message}`);
        }
    }
}

function addCorrectParam(location: string): string {
    const zipRegEx = /^\d{5}$/;
    if (zipRegEx.test(location)) {
        return `/?zip=${location}`;
    } else {
        const parts = location.split(',');
        if (parts.length !== 2) {
            throw new Error(`Invalid location format: ${location}`);
        }
        return `/?q=${parts[0].trim()},${parts[1].trim()}`;
    }
}

function printData(locationInfo: any) {
    if (!locationInfo) {
        console.error(`Expected valid geolocation data, got: ${locationInfo}`);
        return;
    }
    console.log(
        `The current weather condition in ${locationInfo.name} is supposedly ${locationInfo.weather[0].main} with ${locationInfo.weather[0].description}`
    );
    console.log(
        `${locationInfo.name} has a Latitude of: ${locationInfo.coord.lat} and a Longitude of: ${locationInfo.coord.lon}\n`
    );
}