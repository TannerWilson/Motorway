## Motorway API tech test
### Candidate: Tanner Wilson

## Running the application
Ensure you have Node.js installed on your system. For details on how to set this up follow the instructions here: [Installing Node](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

Upon cloning the repository you should see the application folder with a 'motorway-takehome-backend' folder. Navigate to this folder and run `docker compose up` to start the database. Please ensure the port `5432` is open and available. If you'd like to configure the database port, change the port value in the `docker-compose.yml` file.

To install and run the application server run the commands below.
- `npm i`
- `node index.js 3000`

The port that the server will run on can be configured in the start command.

Running the index file should start an express server running on the port you gave. Now you should be able to send GET requests to the server. Try sending the request below with your favorite client (curl, Postman, etc.)

- `GET localhost:3000/vehicle/3?timestamp=2022-09-12T12:41:42.000Z`

The response you should see is the details for vehicle 3 with the state that is present after the given timestamp.

``` 
{
    "id": 3,
    "make": "VW",
    "model": "GOLF",
    "state": "sold"
} 
```

To change the status of the result that you see try changing the time stamp. The request below will have a different status.

- `GET localhost:3000/vehicle/3?timestamp=2022-09-12T12:41:30.000Z`
``` 
{
    "id": 3,
    "make": "VW",
    "model": "GOLF",
    "state": "selling"
} 
```

### Tests
Tests can be ran for the project by running `npm test`.
Currently the tests only test the vehicles database interaction and sorting/switching of the timestamps. All other testing was done manually.

Thank you for taking the time to read over this solution.
