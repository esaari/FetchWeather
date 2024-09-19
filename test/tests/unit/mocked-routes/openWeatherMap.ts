// src/tests/mocks/openWeatherMapMock.ts
import nock from 'nock';
import { fullValidResponse } from './mocked-responses/openWeatherFullValidResponseMock';
import { BASE_URI, API_PATH } from '../../../../src/utils/api/openWeatherMap';

// Function to set up mocks
export async function setNockInterceptor() {
    const interceptor =
        nock(BASE_URI)
            .get(API_PATH)
            .query(true) // Allows any query parameters
            .reply(200, fullValidResponse);
}
