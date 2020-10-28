const router = require('express').Router();
let Instrument = requrie('../models/instrument.model');

router.route('/').get((req, res) => {
    Instrument.find()
        .then(instruments => res.json(instruments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newInstrument = new Instrument({
        username,
        description,
        duration,
        date,
    });

    newInstrument.save()
        .then(() => res.json('Instrument added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;