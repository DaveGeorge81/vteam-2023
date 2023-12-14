/**
 * API routes.
 * © Vteam 2023 Group 8.
 */
import { Router, urlencoded } from 'express';
const router = Router();
import { getAllCities, getCity, addCity, updateCity, deleteCity, getAllUsers, getUser, addUser, updateUser, withdrawUser, deleteUser, getBikesCity, getBikesCityStatus, getBike, getBikeUser, addBike, updateBike, updateBikeUserStatus, updateBikePosSpeedBatt, deleteBike, getStationsCity, getStation, addStation, updateStation, addNumFreeStation, deleteStation, getParkZonesCity, getParkZone, addParkZone, updateParkZone, deleteParkZone } from "../models/db_model.js";

const urlencodedParser = urlencoded({ extended: false });

/**
 * Get all cities.
 */
router.get('/cities', (req, res) => {
    const result = getAllCities();

    return res.status(200).json(result);
});

/**
 * Get a specific city.
 */
router.get('/cities/:id', (req, res) => {
    const result = getCity(req.params.id);

    return res.status(200).json(result);
});

/**
 * Add a new city.
 */
router.post('/cities', urlencodedParser, (req, res) => {
    const result = addCity(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            newId: -1,
            message: result.message
        });
    }

    return res.status(201).json({
        count: result.changes,
        newId: result.lastInsertRowid,
        message: 'Ok'
    });
});

/**
 * Update a city.
 */
router.put('/cities', urlencodedParser, (req, res) => {
    const result = updateCity(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Delete a city.
 */
router.delete('/cities/:id', (req, res) => {
    const result = deleteCity(req.params.id);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Get all users.
 */
router.get('/users', (req, res) => {
    const result = getAllUsers();

    return res.status(200).json(result);
});

/**
 * Get a specific user.
 */
router.get('/users/:id', (req, res) => {
    const result = getUser(req.params.id);

    return res.status(200).json(result);
});

/**
 * Add a new user.
 */
router.post('/users', urlencodedParser, (req, res) => {
    const result = addUser(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            newId: -1,
            message: result.message
        });
    }

    return res.status(201).json({
        count: result.changes,
        newId: result.lastInsertRowid,
        message: 'Ok'
    });
});

/**
 * Update a user.
 */
router.put('/users', urlencodedParser, (req, res) => {
    const result = updateUser(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Withdraw from a user's balance.
 * A deposit is a negative withdrawal.
 * A negative balance is allowed.
 */
router.put('/users/withdraw', urlencodedParser, (req, res) => {
    const result = withdrawUser(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Delete a user.
 */
router.delete('/users/:id', (req, res) => {
    const result = deleteUser(req.params.id);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Get all bikes of a city.
 */
router.get('/bikes/city/:city_id', (req, res) => {
    const result = getBikesCity(req.params.city_id);

    return res.status(200).json(result);
});

/**
 * Get all bikes of a city and status.
 */
router.get('/bikes/city/:city_id/status/:status_id', (req, res) => {
    const result = getBikesCityStatus(req.params.city_id, req.params.status_id);

    return res.status(200).json(result);
});

/**
 * Get a specific bike.
 */
router.get('/bikes/:id', (req, res) => {
    const result = getBike(req.params.id);

    return res.status(200).json(result);
});

/**
 * Get a bike of a user.
 */
router.get('/bikes/user/:user_id', (req, res) => {
    const result = getBikeUser(req.params.user_id);

    return res.status(200).json(result);
});

/**
 * Add a new bike.
 */
router.post('/bikes', urlencodedParser, (req, res) => {
    const result = addBike(req.body);

    return res.status(201).json({
        count: result.changes,
        newId: result.lastInsertRowid,
        message: 'Ok'
    });
});

/**
 * Update all bike properties.
 */
router.put('/bikes', urlencodedParser, (req, res) => {
    const result = updateBike(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Update bike user and status.
 */
router.put('/bikes/user_status', urlencodedParser, (req, res) => {
    const result = updateBikeUserStatus(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Update bike position, speed and battery.
 */
router.put('/bikes/pos_speed_batt', urlencodedParser, (req, res) => {
    const result = updateBikePosSpeedBatt(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Delete a bike.
 */
router.delete('/bikes/:id', (req, res) => {
    const result = deleteBike(req.params.id);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Get all charging stations of a city.
 */
router.get('/stations/city/:city_id', (req, res) => {
    const result = getStationsCity(req.params.city_id);

    return res.status(200).json(result);
});

/**
 * Get a specific charging station.
 */
router.get('/stations/:id', (req, res) => {
    const result = getStation(req.params.id);

    return res.status(200).json(result);
});

/**
 * Add a new charging station.
 */
router.post('/stations', urlencodedParser, (req, res) => {
    const result = addStation(req.body);

    return res.status(201).json({
        count: result.changes,
        newId: result.lastInsertRowid,
        message: 'Ok'
    });
});

/**
 * Update a charging station.
 */
router.put('/stations', urlencodedParser, (req, res) => {
    const result = updateStation(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Add number of free positions.
 * A positive number increases num_free.
 * A negative number decreases num_free.
 */
router.put('/stations/addfree', urlencodedParser, (req, res) => {
    const result = addNumFreeStation(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Delete a charging station.
 */
router.delete('/stations/:id', (req, res) => {
    const result = deleteStation(req.params.id);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Get all parking zones of a city.
 */
router.get('/park_zones/city/:city_id', (req, res) => {
    const result = getParkZonesCity(req.params.city_id);

    return res.status(200).json(result);
});

/**
 * Get a specific parking zone.
 */
router.get('/park_zones/:id', (req, res) => {
    const result = getParkZone(req.params.id);

    return res.status(200).json(result);
});

/**
 * Add a new parking zone.
 */
router.post('/park_zones', urlencodedParser, (req, res) => {
    const result = addParkZone(req.body);

    return res.status(201).json({
        count: result.changes,
        newId: result.lastInsertRowid,
        message: 'Ok'
    });
});

/**
 * Update a parking zone.
 */
router.put('/park_zones', urlencodedParser, (req, res) => {
    const result = updateParkZone(req.body);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});

/**
 * Delete a parking zone.
 */
router.delete('/park_zones/:id', (req, res) => {
    const result = deleteParkZone(req.params.id);

    if (result.changes === 0) {
        return res.status(400).json({
            count: 0,
            message: result.message ? result.message : 'id not found'
        });
    }

    return res.status(200).json({
        count: result.changes,
        message: 'Ok'
    });
});




export default router;
