import { Command } from 'commander';
import { validateInput, validateLength } from "./utils/inputValidator";
import { getWeather} from "./utils/api/openWeatherMap";

const program = new Command();

program
    .name('fetchWeather')
    .version('1.0')
    .description('A simple CLI utility to return a geo-located weather forecast based on input location.')
    .argument('<locations...>', 'Specify a single 5-digit zip code, comma separated city/state combination or combination of the two, maximum 10 entries')
    .action((locations) => {
        validateLength(locations); // Validate arguments are present and do not exceed 10
        validateInput(locations); // Validate City/State and zip codes are valid input
        getWeather(locations);
});

program.parse(process.argv);
