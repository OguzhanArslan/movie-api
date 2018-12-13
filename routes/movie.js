const express = require('express');
const router = express.Router();

const Movies = require('../models/Movie');

router.post('/movie', (req, res, next) => {    
    const movie = new Movies(req.body);
    const promise = movie.save();
    promise.then((data) => {
        res.json({ status: 1 });
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;