import { test, expect } from '@playwright/test';
import { validateInput, validateLength } from '../../../../src/utils/inputValidator';
test.describe('validateInput Function', () => {
    test('should throw an error when locations is null', () => {
        expect(() => validateInput(null)).toThrowError('Expected a list of locations, but received: null');
    });
    test('should throw an error when locations is undefined', () => {
        expect(() => validateInput(undefined)).toThrowError('Expected a list of locations, but received: undefined');
    });
    test('should throw an error when any location is invalid', () => {
        const invalidLocations = ['123', 'ABCDE', '123456', 'CityState', 'City, STT'];
        invalidLocations.forEach((loc) => {
            expect(() => validateInput([loc])).toThrowError(`ERROR: ${loc} at index 0 must be a valid 5-digit zip code or City,State`);
        });
    });
    test('should not throw an error when all locations are valid zip codes', () => {
        const validZipCodes = ['12345', '67890', '54321'];
        expect(() => validateInput(validZipCodes)).not.toThrow();
    });
    test('should not throw an error when all locations are valid city, state formats', () => {
        const validCityStates = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL'];
        expect(() => validateInput(validCityStates)).not.toThrow();
    });
    test('should not throw an error with mixed valid zip codes and city, state formats', () => {
        const mixedValidLocations = ['12345', 'Miami, FL', '67890', 'Seattle, WA'];
        expect(() => validateInput(mixedValidLocations)).not.toThrow();
    });
});
test.describe('validateLength Function', () => {
    test('should throw an error when locations is null', () => {
        expect(() => validateLength(null)).toThrowError('Expected a list of locations, but received: null');
    });
    test('should throw an error when locations is undefined', () => {
        expect(() => validateLength(undefined)).toThrowError('Expected a list of locations, but received: undefined');
    });
    test('should throw an error when no locations are provided', () => {
        expect(() => validateLength([])).toThrowError('No locations provided. Please specify at least one location.');
    });
    test('should throw an error when more than 10 locations are provided', () => {
        const tooManyLocations = Array(11).fill('12345');
        expect(() => validateLength(tooManyLocations)).toThrowError('ERROR: Too many arguments. Please input no more than 10 locations.');
    });
    test('should not throw an error when 1 to 10 locations are provided', () => {
        for (let i = 1; i <= 10; i++) {
            const validNumberOfLocations = Array(i).fill('12345');
            expect(() => validateLength(validNumberOfLocations)).not.toThrow();
        }
    });
});
