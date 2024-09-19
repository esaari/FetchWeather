import got from 'got';

export async function getFromEndpoint(uri, params, apiKey) {
    const countryCode = 'US';  // We will hardcode this function to United States locales
    const apiKeyParamName = Object.keys(apiKey)[0];
    const fullUrl = `${ uri }${ params },${ countryCode }&${ apiKeyParamName }=${ apiKey.appid }`;

    try {
        const response = await got((fullUrl), {
            responseType: 'json',
        });
        return response.body;
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
        throw error;
    }
}
