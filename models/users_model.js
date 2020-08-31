// Loading the mongoose module
const mongoose = require('mongoose');
const schema = mongoose.Schema;

/**
 * A user model should include the user's username, password, the user's role (Admin for administrator
 * or General for general users), and finally the date the user is created.
 */
const userSchema = new schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {
        type: String, required: true, enum: ['General', 'Admin'],
        description: "Can only be one of the enum values and is required!"
    },
    date: {type: Date, default: Date.now}
});

// Compiling user model
const User = mongoose.model('User', userSchema);

// Exporting the user model
module.exports = User;

