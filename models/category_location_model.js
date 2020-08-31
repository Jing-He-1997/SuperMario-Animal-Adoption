// Loading the mongoose module
const mongoose = require('mongoose');
const schema = mongoose.Schema;

/**
 * The category_location model should include location and date.
 */
const locationSchema = new schema({
    location: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

// Compiling the category_location model
const Location = mongoose.model('Location', locationSchema);

// Exporting the category_location model
module.exports = Location;

