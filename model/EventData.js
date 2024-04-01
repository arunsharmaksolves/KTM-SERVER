const mongoose = require('mongoose')
const eventDataSchema = new mongoose.Schema({
    event: String,
    timestamp: Date,
    target: {
        tagName: String,
        id: String,
        innerText: String
    },
    ipAddress: String,
    location: Object,
    timeSpent: Number
});

module.exports = mongoose.model('EventData', eventDataSchema);