/**
 * API routes.
 * © Vteam 2023 Group 8.
 */
const express = require('express');
const router = express.Router();
const db = require("../models/db_model.js");

const urlencodedParser = express.urlencoded({ extended: false });

router.get('/cities', (req, res) => {
    const result = db.getAllCities();

    return res.status(200).json(result);
});

router.get('/cities/:id', (req, res) => {
    const result = db.getCity(req.params.id);

    return res.status(200).json(result);
});

router.post('/cities', urlencodedParser, (req, res) => {
    const result = db.addCity(req.body);

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

router.put('/cities', urlencodedParser, (req, res) => {
    const result = db.updateCity(req.body);

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

router.delete('/cities/:id', (req, res) => {
    const result = db.deleteCity(req.params.id);

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





module.exports = router;
