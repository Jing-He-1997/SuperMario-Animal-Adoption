const mongoose = require('mongoose');
const schema = mongoose.Schema;

/**
 * The comment model should include the user who post the comment, the content of the comment,
 * the id of the animal to know where this comment is posted, and the date of the post so that the
 * comments could be sorted and listed in sequence.
 */
var commentsSchema = new schema({
    user: {type: String, required: true},
    content: {type: String, required: true},
    animal: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});

//To find all the comments under the specific animal sorted by date
commentsSchema.statics = {
    fetch: function(animal, cb){
        return this
            .find({animal: animal})
            .sort('date')
            .exec(cb);
    }
};
// Compiling comment model and exports
const Comment = mongoose.model('Comment', commentsSchema);
module.exports = Comment;