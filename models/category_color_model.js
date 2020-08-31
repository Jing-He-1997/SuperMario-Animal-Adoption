// Loading the mongoose module
const mongoose = require('mongoose');
const schema = mongoose.Schema;

/**
 * The category_color model should include location and date.
 */
const colorSchema = new schema({
    color: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

// Compiling the category_color model
const Color = mongoose.model('Color', colorSchema);

// Exporting the category_color model
module.exports = Color;

