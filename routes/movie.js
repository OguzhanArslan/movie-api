const express = require('express');
const router = express.Router();

const Movies = require('../models/Movie');

// add
router.post('/', (req, res, next) => {    
    const movie = new Movies(req.body);
    const promise = movie.save();
    promise.then((data) => {
        res.json({ status: 1 });
    }).catch((err) => {
        res.json(err);
    });
});

// list
router.get('/', (req, res) => {
    const promise = Movies.find({ });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

// top 10 list
router.get('/top10', (req, res) => {
    const promise = Movies.find({ }).limit(10).sort({ imdb_score: -1 });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })

});

// item
router.get('/:movie_id', (req, res, next) => {
    const promise = Movies.findById(req.params.movie_id);
    promise.then((data) => {
        if(!data)
            return next({ message: 'The movie was not found.', code: 99 });
        
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

// update
router.put('/:movie_id', (req, res, next) => {
    const promise = Movies.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new: true
        }
    );

    promise.then((data) => {
        if(!data)
            return next({ message: 'The movie was not fount.', code: 98 });

        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

// delete
router.delete('/:movie_id', (req, res, next) => {
    const promise = Movies.findByIdAndRemove(req.params.movie_id);

    promise.then((data) => {
        if(!data)
            return next({ message: 'The movie was not fount.', code: 97 });

        res.json({ status: 1 });
    }).catch((err) => {
        res.json(err);
    });
});

// between

router.get('/between/:start_year/:end_year', (req, res) => {
    const { start_year, end_year } = req.params;
    const promise = Movies.find(
        {
            year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
        }
    );

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;