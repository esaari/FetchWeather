import { test, expect } from '@playwright/test';
import { validateInput, validateLength } from '../../../src/utils/inputValidator';

// Mock validation logic for valid/invalid inputs
test.describe('validateInput Function', () => {

    // Test valid input: ZIP codes
    test('should allow valid 5-digit ZIP codes', () => {
        const validZipCodes = ['10001', '90210', '30301'];
        expect(() => validateInput(validZipCodes)).not.toThrow();
    });

    // Test valid input: City/State combinations
    test('should allow valid city/state combinations', () => {
        const validCityState = ['New York,NY', 'Los Angeles,CA', 'Atlanta,GA'];
        expect(() => validateInput(validCityState)).not.toThrow();
    });

    // Test invalid input: Non-5-digit numbers
    test('should throw an error for invalid ZIP codes', () => {
        const invalidZipCodes = ['1234', 'abcde', '123456'];
        expect(() => validateInput(invalidZipCodes)).toThrowError('Invalid ZIP code format');
    });

    // Test invalid input: Malformed city/state combinations
    test('should throw an error for invalid city/state combinations', () => {
        const invalidCityState = ['NewYork', 'LosAngeles,', 'Atlanta-GA'];
        expect(() => validateInput(invalidCityState)).toThrowError('Invalid city/state format');
    });

    // Test mixed valid and invalid inputs
    test('should throw an error for a mix of valid and invalid inputs', () => {
        const mixedInputs = ['10001', 'New York,NY', 'invalidInput'];
        expect(() => validateInput(mixedInputs)).toThrowError('Invalid input format');
    });

    // Test empty input
    test('should throw an error for empty input', () => {
        const emptyInput: string[] = [];
        expect(() => validateInput(emptyInput)).toThrowError('No input provided');
    });
});

test.describe('validateLength Function', () => {

    // Test valid input length (less than 10)
    test('should allow input with up to 10 locations', () => {
        const validInputs = ['10001', '90210', '30301', '94016', '60601', '20001', '85001', '33101', '94103', '73301'];
        expect(() => validateLength(validInputs)).not.toThrow();
    });

    // Test exact limit (10 locations)
    test('should allow exactly 10 locations', () => {
        const exactInputs = ['10001', '90210', '30301', '94016', '60601', '20001', '85001', '33101', '94103', '73301'];
        expect(() => validateLength(exactInputs)).not.toThrow();
    });

    // Test more than 10 locations
    test('should throw an error if input exceeds 10 locations', () => {
        const tooManyInputs = ['10001', '90210', '30301', '94016', '60601', '20001', '85001', '33101', '94103', '73301', '12345'];
        expect(() => validateLength(tooManyInputs)).toThrowError('Too many locations provided, maximum is 10');
    });

    // Test empty input
    test('should throw an error for empty input', () => {
        const emptyInput: string[] = [];
        expect(() => validateLength(emptyInput)).toThrowError('No locations provided');
    });

    // Test edge case: one input
    test('should allow a single location', () => {
        const singleInput = ['10001'];
        expect(() => validateLength(singleInput)).not.toThrow();
    });

    // Test edge case: exactly 9 locations
    test('should allow exactly 9 locations', () => {
        const nineInputs = ['10001', '90210', '30301', '94016', '60601', '20001', '85001', '33101', '94103'];
        expect(() => validateLength(nineInputs)).not.toThrow();
    });
});