var mongoose = require('mongoose');
var schema = mongoose.Schema;

/**
 * The animal model should include name, type,image,gender, color, location, status, introduction and date.
 * The date include creating date and updating date.
 */

var animalSchema = new schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    image: {type: String, required: true},
    gender: {type: String, required: true},
    color: {type: String, required: true},
    location: {type: String, required: true},
    status: {type: Number, default: 0, required: true, enum: [0, 1]},
    introduction: {type: String},

    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }

});

//To save the animal and save the date or create a new date if the animal is new
animalSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next()
    console.log('Animal saved');
});

//To find all the animals sorted by date or search animal by using id
animalSchema.statics = {
    // Fetch all data from the current database
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)

    },
    // Query single data
    findById: function (id, cb) {
        return this.find({_id: id}).exec(cb)

    }

};

// Compiling and exporting the model
const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;