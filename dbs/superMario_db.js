const mongoose = require('mongoose');

/**
 * Connect to local mongodb, create and connect the database 'animalsAdoption' for all the project's data to store
 */
mongoose.connect("mongodb://localhost:27017/animalsAdoption", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('MongoDB connection success!')
    }
});