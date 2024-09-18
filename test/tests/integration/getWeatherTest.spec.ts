// test/integration/utils/getWeather.spec.ts
import { test, expect } from '@playwright/test';
import { getWeather } from '../../../src/utils/api/openWeatherMap';
import { fullValidResponse } from '../mocks/openWeatherFullValidResponse';

// Define the type for getFromEndpoint
type GetFromEndpoint = (baseUri: string, queryParam: string, key: string) => Promise<any>;

/**
 * Mock implementation of getFromEndpoint that returns a predefined response.
 */
const mockGetFromEndpoint: GetFromEndpoint = async (baseUri, queryParam, key) => {
    // You can customize responses based on queryParam if needed
    return fullValidResponse;
};

test.describe('getWeather Function Integration Tests', () => {
    let originalConsoleLog: (...args: any[]) => void;
    let originalConsoleError: (...args: any[]) => void;
    let logOutput: string[];
    let errorOutput: string[];

    test.beforeEach(() => {
        // Backup original console methods
        originalConsoleLog = console.log;
        originalConsoleError = console.error;

        // Initialize output arrays
        logOutput = [];
        errorOutput = [];

        // Override console.log
        console.log = (...args: any[]) => {
            logOutput.push(args.join(' '));
        };

        // Override console.error
        console.error = (...args: any[]) => {
            errorOutput.push(args.join(' '));
        };
    });

    test.afterEach(() => {
        // Restore original console methods
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    });

    test('should process valid zip codes correctly', async () => {
        const locations = ['12345', '67890'];

        await getWeather(locations, mockGetFromEndpoint);

        // Each location results in two console.log calls
        expect(logOutput.length).toBe(4);

        // Check the content of the logs
        locations.forEach((loc, index) => {
            expect(logOutput[index * 2]).toContain(
                `The current weather condition in ${fullValidResponse.name} is supposedly ${fullValidResponse.weather[0].main} with ${fullValidResponse.weather[0].description}`
            );
            expect(logOutput[index * 2 + 1]).toContain(
                `${fullValidResponse.name} has a Latitude of: ${fullValidResponse.coord.lat} and a Longitude of: ${fullValidResponse.coord.lon}`
            );
        });

        // Ensure no errors were logged
        expect(errorOutput.length).toBe(0);
    });

    test('should process valid city, state formats correctly', async () => {
        const locations = ['New York, NY', 'Los Angeles, CA'];

        await getWeather(locations, mockGetFromEndpoint);

        // Each location results in two console.log calls
        expect(logOutput.length).toBe(4);

        // Check the content of the logs
        locations.forEach((loc, index) => {
            expect(logOutput[index * 2]).toContain(
                `The current weather condition in ${fullValidResponse.name} is supposedly ${fullValidResponse.weather[0].main} with ${fullValidResponse.weather[0].description}`
            );
            expect(logOutput[index * 2 + 1]).toContain(
                `${fullValidResponse.name} has a Latitude of: ${fullValidResponse.coord.lat} and a Longitude of: ${fullValidResponse.coord.lon}`
            );
        });

        // Ensure no errors were logged
        expect(errorOutput.length).toBe(0);
    });

    test('should handle invalid locations gracefully', async () => {
        const locations = ['123', 'ABCDE', 'CityState', 'City, STT'];

        // Create a mock that throws an error for invalid locations
        const mockGetFromEndpointInvalid: GetFromEndpoint = async (baseUri, queryParam, key) => {
            throw new Error('Invalid location format');
        };

        await getWeather(locations, mockGetFromEndpointInvalid);

        // Each invalid location should result in one error log
        expect(errorOutput.length).toBe(4);
        expect(errorOutput).toEqual([
            'Failed to fetch data for 123: Invalid location format',
            'Failed to fetch data for ABCDE: Invalid location format',
            'Failed to fetch data for CityState: Invalid location format',
            'Failed to fetch data for City, STT: Invalid location format',
        ]);

        // No successful logs should be present
        expect(logOutput.length).toBe(0);
    });

    test('should handle mixed valid and invalid locations', async () => {
        const locations = ['12345', 'ABCDE', 'New York, NY', 'CityState'];

        // Create a mock that returns valid response for valid locations and throws for invalid ones
        const mockGetFromEndpointMixed: GetFromEndpoint = async (baseUri, queryParam, key) => {
            if (queryParam.startsWith('/?zip=12345') || queryParam.startsWith('/?q=New York,NY')) {
                return fullValidResponse;
            }
            throw new Error('Invalid location format');
        };

        await getWeather(locations, mockGetFromEndpointMixed);

        // Valid locations: '12345' and 'New York, NY' result in two console.log calls each
        expect(logOutput.length).toBe(4);
        expect(logOutput).toEqual([
            `The current weather condition in ${fullValidResponse.name} is supposedly ${fullValidResponse.weather[0].main} with ${fullValidResponse.weather[0].description}`,
            `${fullValidResponse.name} has a Latitude of: ${fullValidResponse.coord.lat} and a Longitude of: ${fullValidResponse.coord.lon}\n`,
            `The current weather condition in ${fullValidResponse.name} is supposedly ${fullValidResponse.weather[0].main} with ${fullValidResponse.weather[0].description}`,
            `${fullValidResponse.name} has a Latitude of: ${fullValidResponse.coord.lat} and a Longitude of: ${fullValidResponse.coord.lon}\n`,
        ]);

        // Invalid locations: 'ABCDE' and 'CityState' result in error logs
        expect(errorOutput.length).toBe(2);
        expect(errorOutput).toEqual([
            'Failed to fetch data for ABCDE: Invalid location format',
            'Failed to fetch data for CityState: Invalid location format',
        ]);
    });

    test('should handle empty locations list', async () => {
        const locations: string[] = [];

        await getWeather(locations, mockGetFromEndpoint);

        // No logs should be present
        expect(logOutput.length).toBe(0);
        expect(errorOutput.length).toBe(0);
    });
});
