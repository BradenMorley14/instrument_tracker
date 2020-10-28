const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const instrumentSchema = new Schema({
    username: {type: String, require: true},
        description: {type: String, required: true},
        duration: {type: Number, required: true},
        date: {type: Date, required: true},
}, {
    timestamps: true,
});

const Instrument = mongoose.model('Instrument', instrumentSchema);

module.exports = Instrument;