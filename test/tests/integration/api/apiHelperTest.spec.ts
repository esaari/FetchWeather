import { test, expect } from '@playwright/test';
import { getFromEndpoint } from '../../../../src/utils/api/apiHelpers';
import { KEY } from '../../../../src/utils/api/key';
import { BASE_URI, API_PATH } from "../../../../src/utils/api/openWeatherMap";
import { response } from "../../mocks/fullValidResponse";


test.describe.skip('getFromEndpoint Integration Tests', () => {
    test('should fetch weather data successfully for a valid location', async () => {
       const result = await getFromEndpoint(BASE_URI, API_PATH, KEY);
       expect(Object.keys(response)).toEqual(Object.keys(result));
    });

    test('should return 401 for bad/unauthorized key', async () => {
        const KEY = { appid: 'abcd'};
        const result = await getFromEndpoint(BASE_URI, API_PATH, KEY);
        expect(result.responseCode).toEqual((401));
    });
});
