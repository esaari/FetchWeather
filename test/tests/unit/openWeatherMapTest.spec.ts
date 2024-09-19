// src/tests/getWeather.test.ts
import { test, expect } from '@playwright/test';
import { includeHooks } from './hooks';
import { getWeather } from '../../../src/utils/api/openWeatherMap';
import { setNockInterceptor } from './mocked-routes/openWeatherMap';

test.describe.skip('getWeather Integration Tests', () => {

    includeHooks()

    test('should fetch and print weather data for valid locations', async() => {
        const locations = ['10001', 'Los Angeles, CA']; // Valid locations
        await setNockInterceptor();
        const response = await getWeather(locations);
        expect(response).toContain('The current weather condition in Beverly Hills is supposedly Cloud');
    });
});
