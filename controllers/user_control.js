const mongoose = require('mongoose');
const User = require('../models/users_model');

/**
 * Some simple validation for registration
 * @param req : the request to register with the information for registering a new user
 * @param res : to validate the user data and respond if the registration is successful
*/
exports.register = (req, res)=>{
    var userData = req.body;
    //Find if the username has already been used
    User.findOne({username: userData.username})
        .then(user=>{
            if(user) {
                res.setHeader('contentType', 'application/json');
                res.send({'message': 'This username already exists!'});
            } else {
                //If the username does not exist in the database, then create a new user
                var newUser = new User({
                    username: userData.username,
                    password: userData.password,
                    role: userData.role,
                    date: Date.now()
                });
                //Save and respond with json formatted information
                newUser.save((err, result)=>{
                    if (err){
                        res.setHeader('contentType', 'application/json');
                        res.send(JSON.stringify({'message': 'Invalid data input!'}));
                    }
                    else {
                        console.log('User created!');
                        res.setHeader('contentType', 'application/json');
                        res.send(JSON.stringify(newUser));
                    }
                });
            }
        });
};

/**
 * Simple validation for user to log in
 * @param req : request to log in with the information of username and password
 * @param res : respond whether the user passed the validation
 */
exports.login = (req, res)=>{
    var userData = req.body;
    //Find the username in the database
    User.findOne({username: userData.username})
        .then((user)=>{
            if(user) {
                //If the username exists, then check if the password match the data stored in the database
                if(user.password != userData.password){
                    res.setHeader('contentType', 'application/json');
                    res.send({'message': 'Password incorrect!'});
                } else {
                    //Verification success, store the username and his/her role (Admin or General) in cookie
                    // so that the server could know which kind of browsing page to render
                    res.cookie('role', user.role, {path:'/',signed: true, maxAge: 6 * 600000});
                    res.cookie('user', user.username, {path: '/', signed: true, maxAge: 6 * 600000 });

                    //Redirect to browsing page (home page)
                    user._doc.toURL = '/browse';
                    res.setHeader('contentType', 'application/json');
                    res.send(JSON.stringify(user));
                }
            } else {
                res.setHeader('contentType', 'application/json');
                res.send({'message': 'This username does not exist!'});
            }
        });
};