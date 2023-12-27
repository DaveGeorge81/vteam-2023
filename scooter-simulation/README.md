# Scooter Simulator for SparkRentals Project
## Content
- [About](#about)
- [Download](#download)
- [Download and Usage](#download-and-usage)
- [License and Tools](#license-and-tools)
## About
This project is created by 4 students who attend Blekinge Institute of Technology in web programming. We were given the task of creating a system for a scooter company where we would, among other things, create a mobile-adapted web app for the customer, administrative web interface, a simulation program for the electric scooters, an intelligence program in the bicycle and a Rest API that distributes and retrieves information from the entire system and stores the information on a database.

### Background
The scooter program will be the very brain of every scooter that is driven. The program will simulate several scooters with speed, gps, sessions, battery, owner, etc. When starting up the scooter, the bike will communicate with the MongoDB database to either register a new scooter or activate an existing scooter. In order for the scooter to "know" who it is, a small configuration file will be saved per scooter. If there is nothing like that saved, it is a new scooter and it will then be registered. At certain time intervals, the scooter will update the data that the scooter itself has control over. Eg position, speed and battery. At another determined interval, the scooter will retrieve information from the database to update its own status. This is so that the scooter will know if it has been rented, shut down by admin etc.

## Download and Usage
To run this program you have to use either node or docker.
The node version:

    node scooter_hive.js: This will start a hive of scooters.
    Spawning new ones if defined and also starting all existing scooters on your database.
    It will run scooters in all cities but only spawn random ones i a city of your choosing. Defined by env variables.
    node user_simulation.js: This will start a rent simulation.
    It fetches all fake users from your database(defined by an autoGen property on the account).
    It will then attempt to rent as many scooters as possible(Some users wont rent because of lacking money or if a scooter is unavailable).
    The user simulation only works on one city at a time, this is defined by environment variables.

The docker version:

    jolpango/scooter-simulation:stable: The same as scooter_hive but in docker.
    jolpango/user-simulation:stable: The same as user_simulation but in docker.

Required environment variables:

    #--------------------- General -----------------------
    DBURI=YOUR_MONGO_CONNECTION_STRING
    GEOAPIFY_KEY=YOUR_GEOAPIFY_KEY
    API_URL=URL_YO_YOUR_API
    REACT_APP_REST_API_KEY=YOUR_API_KEY

    #--------------------- Simulation config -----------------------

    #SCOOTER_CONFIG
    NUMBER_OF_SCOOTERS=NUMBER_OF_SCOOTERS_TO_GENERATE
    UPDATE_FREQUENCY_MILLISECONDS=1000
    BATTERY_DEPLETION_RATE=0.005
    SIMULATION_CITY=YOUR_CITY

    #KARLSKRONA DROPZONE EXAMPLE
    SIMULATION_MAX_LAT="56.166217"
    SIMULATION_MIN_LAT="56.158594"
    SIMULATION_MAX_LON="15.593868"
    SIMULATION_MIN_LON="15.583096"

    # The higher the number, the slower the scooters move. 10 is recommended
    SIMULATION_ROUTE_PADDING=10

    SIMULATION_EMAIL=ADMIN_EMAIL
    SIMULATION_PASSWORD=ADMIN_PASSWORD

## License and Tools

# Spark simulation

This is a submodule of the Spark Project.

The spark simulation is a larger test suite for the project as a unit. It consists of one modified bike object in order to reduce stress on hardware. It simulates a realistic flow of user traffic with registered users unlocking bikes, riding at realistic and randomly generated routes. After the destination is reached the rent is finished by creating an invoice and leaving the bike available for someone else to use, unless it runs out of battery.

You will also notice hove the bikes interact with geofenced areas and the speed will be affected if the zone is a slow or forbidden zone. The simulated will also not be able to park in a forbidden or no parking zone, instead they will turn around and try to find an allowed zone. If they finish a trip in a parking zone it will show on the bike status and generated invoice.

Since the simulation is a API you will find a set of controls to manipulate the simulation below.

It depends on the Database, Client Server and Bike Server to be up and running.

## Start the simulation

The Simulation service can be started with

```bash
# First time using
docker compose build

# Start the service in detached mode
docker compose -d up flask-server
```

## Interact with the simulation

To interact with the features of the Simulation you have these routes at your disposal.

```python
# Listening at localhost:8000


# Start the activation of bikes
GET /sim_start

# Stop the activation of bikes
GET /sim_stop

# Activate a specific bike to ride a specific route
GET /activate/<bike_id>/<user_id>/<position>/<destination>

# Stop a specific bike
GET /stop/<bike_id>
```

## Performance issues

The simulation is simulating close to 4000 users and 4000 bikes in three major cities of sweden and in order to actually test the systems durability and not just give a pleasant visual element, the application is bound to get heavy.

Every few seconds all bikes are iterated with a set chance to becoma active and start riding a specific route. A user is connected to the bike and a rent is created. Every few seconds all active bikes are also iterated in order to update the database with its latest details through the bike server. All while checking battery status, geofence interactions and much more.

When creating the simulation object, you are given a few optinal parameters in order to increase performance.

```python
# Create a default simulation
Sim = Simulation()

# Increase the time between iterations
Sim = Simulation(emit_frequency=10) # Defaults to 5

# Lower the chance of a bike to get activated
Sim = Simulation(activation_chance=0.005) # Defaults to 0.01
```
