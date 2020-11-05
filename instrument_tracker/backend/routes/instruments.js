const router = require('express').Router();
let Instrument = require('../models/instrument.model');

//  This entire thing needs work.

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

router.route('/:id').get((req, res) => {
    Instrument.findById(req.params.id)
        .then(instrument => res.json(instrument))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Instrument.findByIdAndDelete(req.params.id)
        .then(() => res.json('Instrument deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Instrument.findById(req.params.id)
        .then(instrument => {
            instrument.username = req.body.username;
            instrument.description = req.body.description;
            instrument.duration = Number(req.body.duration);
            instrument.date = Date.parse(req.body.date)

            instrument.save()
                .then(() => res.json('Instrument updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;