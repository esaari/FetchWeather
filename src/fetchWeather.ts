import { Command } from 'commander';
import { validateInput, validateLength } from "./utils/inputValidator";
import { getWeather} from "./utils/api/openWeatherMap";

const program = new Command();

program
    .name('fetchWeather')
    .version('1.0')
    .description('A simple CLI utility to return a geo-located weather forecast based on input location.')
    .argument('<locations...>', 'Specify a single 5-digit zip code, comma separated city/state combination or combination of the two, maximum 10 entries')
    .action(async (locations) => {
            try {
                    validateLength(locations); // Ensure locations are valid
                    validateInput(locations);  // Further input validation
                    await getWeather(locations); // Fetch and display weather data
            } catch (error) {
                    console.error('Error fetching weather data:', error.message);
                    process.exit(1);
            }
});

program.parse(process.argv);
