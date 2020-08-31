const mongoose = require('mongoose');
require('mongoose-type-email');
const schema = mongoose.Schema;

/**
 * The applicant model should include name, date of birth, email, and the animals adopted by him/her.
 * The package 'mongoose-type-email' is used for validating the input email.
 * The animal property points to the animal model's id.
 */
var applicantSchema = new schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dob: {type: Date, required: true},
    email: {type: mongoose.SchemaTypes.Email, required: true},
    animal: [{type: mongoose.Schema.Types.ObjectID, ref: 'Animal', required: true}]
});

// Compiling and exporting the model
var Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant;
