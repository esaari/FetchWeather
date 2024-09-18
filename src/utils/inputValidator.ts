const MAX_ARGS = 10;
const zipCodeRegex = /^\d{5}$/;
const cityStateRegex = /^[A-Za-z\s]+,\s*[A-Za-z]{2}$/;

export function validateInput(locations) {
    if (!locations) {
        throw new Error(`Expected a list of locations, but received: ${locations}`);
    }
    locations.forEach((argument, index) => {
        if (!zipCodeRegex.test(argument) && !cityStateRegex.test(argument)) {
            throw new Error(`ERROR: ${argument} at index ${index} must be a valid 5-digit zip code or City,State`);
        }
    });
}

export function validateLength(locations) {
    if (!locations) {
        throw new Error(`Expected a list of locations, but received: ${locations}`);
    }
    if (locations.length === 0) {
        throw new Error('No locations provided. Please specify at least one location.');
    } else if (locations.length > MAX_ARGS) {
        throw new Error('ERROR: Too many arguments. Please input no more than 10 locations.');
    }
}