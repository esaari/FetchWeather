Hello! Thank you for taking the time to evaluate my submission. 

I try to use these take home assignments as opportunities to work with newer frameworks and libraries. In this case, 
I've never had to think through how to build a scalable CLI tool, so working with libs like 'commander' was s first for me.

Additionally, I sought to leverage the unit/component testing features of Microsoft Playwright. I discovered that while 
it is great for browser-based, end-to-end tests, it does not have full capabilities out of box for unit testing. 

The mocking and interception features only work with browser object fixtures, so an external dependency is still needed 
for capturing network traffic. 

I had some challenges and lessons learned going throguh this assignment, which I'd love to be able to discuss in more 
deatail. Notably, rather than staring a new project from scratch, I should have embraced "code reusability" and looked 
for a boilerplate project that had the Typescript/JS interoperability already set up so save time. I also should have 
chosen a traditional unit test runner such as Mocha or Jasmine, but I'm happy I discovered some of Playwright's limitations.


This will assume Node is pre-installed on the host system. 

Execute as follows: 

`npm i`

`npx tsx ./src/fetchWeather.ts "12533" "Jersey City, NJ" "Las Vegas, NV" "90210"`

To execute tests: 

`cd test`

`npm i` (install test dependencies)

`npm run test:unit` (run unit tests)

`npm run test:integration` (run integration tests)
