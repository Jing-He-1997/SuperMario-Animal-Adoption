const mongoose = require('mongoose');
const Comment = require('../models/comments_model');

/**
 * Add new comments to the database to be listed in the corresponded animal page
 * @param req : reqest from user posting the comment with the animal id as a parameter
 * @param res : respond any error occurring or send back the new comment in json format
 */
exports.newComment = function(req, res){
    var commentData = req.body;
    //Create a new comment, using the username stored in cookie to mark who posts this comment
    var newCom = new Comment({
        user: req.signedCookies.user,
        content: commentData.content,
        animal: commentData.id
    });
    //Save and respond with json type data with new comment data included
    newCom.save(function(err, comment){
        if (err) console.log('Error: ' + err);
        res.setHeader('contentType', 'application/json');
        res.send(JSON.stringify(newCom));
    });
};
