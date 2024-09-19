import {test} from "@playwright/test";
import nock from "nock";

export function includeHooks() {
    test.beforeAll(async () => {
        // Disable all real network connections
        nock.disableNetConnect();
        console.log('nock mocks set up and real network connections disabled');
    });

    test.beforeEach(() => {
    })

    test.afterEach(async () => {
        nock.cleanAll();
    })
    test.afterAll(async () => {
        nock.enableNetConnect(); // Re-enable real network connections
        console.log('nock mocks cleaned up and real network connections enabled');
    });
}