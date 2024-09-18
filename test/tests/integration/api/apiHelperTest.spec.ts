import { test, expect } from '@playwright/test';
import { getFromEndpoint } from '../../../../src/utils/api/apiHelpers'; // Adjust the path as needed

// Mocking 'got' manually
const mockGot = async (url: string, options: { responseType: string }) => {
    // Simulate different behaviors based on the URL or options
    if (url.includes('invalidApiKey')) {
        throw new Error('401 Unauthorized');
    }
    if (url.includes('NetworkError')) {
        throw new Error('Network Error');
    }
    if (url.includes('MalformedResponse')) {
        return { body: null }; // Simulate malformed response
    }
    if (url.includes('InternalError')) {
        throw new Error('500 Internal Server Error');
    }

    // Default successful response
    return {
        body: {
            weather: [
                { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
            ],
            main: {
                temp: 295.28,
                feels_like: 294.93,
                temp_min: 293.18,
                temp_max: 298.23,
                pressure: 1013,
                humidity: 53,
            },
            name: 'New York',
            coord: { lat: 40.7128, lon: -74.006 },
            sys: { country: 'US' },
        },
    };
};

// Replacing the 'got' function in our test environment with 'mockGot'
test.describe('getFromEndpoint Integration Tests', () => {
    test('should fetch weather data successfully for a valid location', async () => {
        const uri = 'https://api.openweathermap.org/data/2.5/weather';
        const params = '/?q=New York';
        const apiKey = { appid: 'fakeApiKey' };

        // Override 'got' in the context of the test
        const response = await getFromEndpoint.bind({ got: mockGot })(uri, params, apiKey);

        expect(response).toBeDefined();
        expect(response.weather[0].main).toBe('Clear');
        expect(response.weather[0].description).toBe('clear sky');
        expect(response.main.temp).toBe(295.28);
        expect(response.name).toBe('New York');
    });

    test('should throw an error for an invalid API key', async () => {
        const uri = 'https://api.openweathermap.org/data/2.5/weather';
        const params = '/?q=Los Angeles';
        const apiKey = { appid: 'invalidApiKey' };

        await expect(getFromEndpoint.bind({ got: mockGot })(uri, params, apiKey)).rejects.toThrow('401 Unauthorized');
    });

    test('should handle network errors gracefully', async () => {
        const uri = 'https://api.openweathermap.org/data/2.5/weather';
        const params = '/?q=Chicago';
        const apiKey = { appid: 'NetworkError' };

        await expect(getFromEndpoint.bind({ got: mockGot })(uri, params, apiKey)).rejects.toThrow('Network Error');
    });

    test('should handle malformed responses from the API', async () => {
        const uri = 'https://api.openweathermap.org/data/2.5/weather';
        const params = '/?q=Houston';
        const apiKey = { appid: 'MalformedResponse' };

        await expect(getFromEndpoint.bind({ got: mockGot })(uri, params, apiKey)).rejects.toThrow('Error fetching weather data');
    });

    test('should handle unexpected server errors', async () => {
        const uri = 'https://api.openweathermap.org/data/2.5/weather';
        const params = '/?q=San Francisco';
        const apiKey = { appid: 'InternalError' };

        await expect(getFromEndpoint.bind({ got: mockGot })(uri, params, apiKey)).rejects.toThrow('500 Internal Server Error');
    });
});
