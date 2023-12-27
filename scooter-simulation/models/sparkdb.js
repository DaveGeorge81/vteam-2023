/**
 * Module for connecting to spark database, a mongo database
 * 
 */

import { MongoClient, ObjectId } from "mongodb";

let mongoURI = "mongodb://localhost:27017"; // Default setting
const databaseName = "bike-rentals";
const collectionName = "scooters";

// Define client up here. close when user want to close
let client = null;


const sparkdbModel = {
    /**
     * Sets the connection string for the database connection
     * returns true if success and false if fail
     * @param string connectionString
     * 
     * @return bool
     */
    setMongoURI: function (connectionString) {
        try {
            mongoURI = connectionString;
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    },

    /**
     * Returns the current connection string
     * @return string
     */
    getMongoURI: function () {
        return mongoURI;
    },

    /**
     * Attempts to find scooter based on id string.
     * Returns null if not found
     * @param string id
     * 
     * @return null | scooter object
     */
    findScooter: async function (id) {
        // const client = new MongoClient(mongoURI);
        let scooter = null;
        try {
            const database = client.db(databaseName);
            const collection = database.collection(collectionName);
            scooter = await collection.findOne({
                "_id": new ObjectId(id)
            });
        } catch (e) {
            console.log(e);
        } finally {
            // await client.close();
        }
        return scooter;
    },

    /**
     * Attempts to add a scooter to the database. You can include _id, if not it will create one for you
     * Returns true or false if success or fail
     * @param mixed scooter
     * 
     * @return bool | scooter
     */
    pushScooter: async function (scooter) {
        // const client = new MongoClient(mongoURI);
        try {
            const database = client.db(databaseName);
            const collection = database.collection(collectionName);
            scooter = await collection.insertOne(scooter); // Will add _id to it if not exists
        } catch (e) {
            console.log(e);
        } finally {
            // await client.close();
        }
        return scooter;
    },

    /**
     * @param ObjectID scooterID
     * @param TripObject logEntry
     * 
     * @return bool
     */
    pushLog: async function (scooterID, logEntry) {
        // const client = new MongoClient(mongoURI);
        try {
            const database = client.db(databaseName);
            const collection = database.collection(collectionName);
            const result = await collection.updateOne({ _id: scooterID }, {
                $push: { log: logEntry }
            });
            if (result.matchedCount !== 1) {
                throw "Error updating scooter in database.";
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        } finally {
            // await client.close();
        }
    },

    /**
     * @param mixed coordinates
     * @param number speed
     * @param number battery
     * 
     * @return bool
     */
    updateScooterStates: async function (scooterID, coordinates, speed, battery) {
        // const client = new MongoClient(mongoURI);
        try {
            const database = client.db(databaseName);
            const collection = database.collection(collectionName);
            const result = await collection.updateOne({ _id: scooterID }, {
                $set: {
                    coordinates: coordinates,
                    speed: speed,
                    battery: battery
                }
            });
            if (result.matchedCount !== 1) {
                throw "Error updating scooter in database.";
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        } finally {
            // await client.close();
        }
    },


    /**
     * @param mixed scooterID
     * @param mixed distance
     * 
     * @return [type]
     */
    updateScooterTrip: async function (scooterID, distance) {
        // const client = new MongoClient(mongoURI);
        try {
            const database = client.db(databaseName);
            const collection = database.collection(collectionName);
            const result = await collection.updateOne({ _id: scooterID }, {
                $set: {
                    "trip.distance": distance
                }
            });
            // console.log(result);
            // console.log(await findScooter(scooterID.toString()));
            if (result.matchedCount !== 1) {
                throw "Error updating scooter in database.";
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        } finally {
            // await client.close();
        }
    },

    /**
     * @param mixed coordinates
     * @param number speed
     * @param number battery
     * 
     * @return bool
     */
    updateStatus: async function (scooterID, status) {
        // const client = new MongoClient(mongoURI);
        try {
            const database = client.db(databaseName);
            const collection = database.collection(collectionName);
            const result = await collection.updateOne({ _id: scooterID }, {
                $set: {
                    status: status
                }
            });
            if (result.matchedCount !== 1) {
                throw "Error updating scooter in database.";
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        } finally {
            // await client.close();
        }
    },

    /**
     * Opens connection to database
     * @return bool
     */
    connect: function () {
        try {
            client = new MongoClient(mongoURI);
        } catch {
            return false;
        }
        return true;
    },

    /**
     * Closes connection to database.
     * @return bool
     */
    close: async function () {
        try {
            await client.close();
        } catch (e) {
            return false;
        }
        return true;
    },

    /**
     * Returns all documents from collection specified
     * @param string name
     * 
     * @return []
     */
    getAllFromCollection: async function (name) {
        const database = client.db(databaseName);
        const collection = database.collection(name);
        const cursor = collection.find({});
        const items = [];
        await cursor.forEach((item) => {
            items.push(item);
        });
        return items;
    },

    /**
     * Returns all documents from collection "users"
     * @return []
     */
    getAllUsers: async function () {
        return await getAllFromCollection("users");
    },

    /**
     * Returns all "fake" documents from collection "users"
     * @return []
     */
    getAllFakeUsers: async function () {
        const database = client.db(databaseName);
        const collection = database.collection("users");
        const cursor = collection.find({ "autoGen": true });
        const items = [];
        await cursor.forEach((item) => {
            items.push(item);
        });
        return items;
    },

    /**
     * Returns all documents from collection "scooters"
     * @return []
     */
    getAllScooters: async function () {
        return await getAllFromCollection(collectionName);
    },

    /**
     * Returns all documents from collection "scooters"
     * @return []
     */
    getScootersInUse: async function (city) {
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        const cursor = collection.find({ status: "In use", owner: city });
        const items = [];
        await cursor.forEach((item) => {
            items.push(item);
        });
        return items;
    },

    /**
     * @return bool
     */
    dropScooters: async function (cb) {
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        await collection.drop((err, delOK) => {
            if (err) {
                throw err;
            }
            if (delOK) {
                console.log(`Collection "${collectionName}" dropped successfully`);
                cb();
            }
        });
        return true;
    }
}

export default sparkdbModel;
