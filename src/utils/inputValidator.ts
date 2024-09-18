const MAX_ARGS = 10;
const zipCodeRegex = /^\d{5}$/;
const cityStateRegex = /^[A-Za-z\s]+,\s*[A-Za-z]{2}$/;

const unusedVar = 'test';

export function validateInput(locations) {
    if (!locations) {
        console.error(`Expected a list of locations, but received: ${ locations }`)
    }
    locations.forEach((argument, index) => {
                    if (!zipCodeRegex.test(argument) && !cityStateRegex.test(argument)) {
            console.error(`ERROR: ${ argument } at index ${ index } must be a valid 5-digit zip code (ex. "12533") or City,State (ex. "New York, NY)`);
        }
    })
}

export function validateLength(locations) {
    if (!locations) {
        console.error(`Expected a list of locations, but received: ${ locations }`)
    }
    if (locations.length === 0) {
        program.help({error: true});
    } else if (locations.length > MAX_ARGS) {
        console.error('ERROR: Too many arguments. Please input no more than 10 locations.');
        process.exit(1);
    }
}