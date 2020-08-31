const mongoose = require('mongoose');
const fs = require('fs');
var _ = require('underscore');
const Animal = require('../models/animals_model');
const Comment = require('../models/comments_model');
const Color = require('../models/category_color_model');
const Location = require('../models/category_location_model');
var path = require('path');

/**
 * To find all the animals needed to be shown and list them. (For all or searched results)
 * @param req :request from ajax query
 * @param res :response to return
 */
exports.list = function (req, res) {
    //The 'if' is for judging which type the data is.
    if (req.query.search != null) {
        //Input type = search
        console.log('search...')
        var keyword = req.query.search;
        console.log(keyword);
        Animal.find({name: new RegExp(keyword + '.*', 'i')}, function (err, animals) {
            if (err) {
                console.log(err);
            }
            //Store the matched animals and the keyword in cookie for later use to list in the browsing page
            res.cookie('animals', animals, {path: '/', signed: true, maxAge: 6 * 600000});
            res.cookie('keyword', keyword, {path: '/', signed: true, maxAge: 6 * 600000});

            //Send the json format response back to front end
            res.setHeader('contentType', 'application/json');
            res.send(JSON.stringify(animals));
        });
    } else if (req.query.color != null) {
        //Input type = category_color
        console.log('color...')
        var keyword = req.query.color;
        console.log(keyword);
        Animal.find({color: new RegExp(keyword + '.*', 'i')}, function (err, animals) {
            if (err) {
                console.log(err);
            }
            res.cookie('animals', animals, {path: '/', signed: true, maxAge: 6 * 600000});
            res.cookie('keyword', '', {path: '/', signed: true, maxAge: 6 * 600000});
            res.setHeader('contentType', 'application/json');
            res.send(JSON.stringify(animals));
        });
    } else if (req.query.location != null) {
        //Input type = category_location
        console.log('location...')
        var keyword = req.query.location;
        console.log(keyword);
        Animal.find({location: new RegExp(keyword + '.*', 'i')}, function (err, animals) {
            if (err) {
                console.log(err);
            }
            res.cookie('animals', animals, {path: '/', signed: true, maxAge: 6 * 600000});
            res.cookie('keyword', '', {path: '/', signed: true, maxAge: 6 * 600000});
            res.setHeader('contentType', 'application/json');
            res.send(JSON.stringify(animals));
        });
    } else {
        //browse
        console.log('browse...')
        // Fetch data from Animal, Color Location databases
        Animal.fetch(function (err, animals) {
            if (err) {
                console.log(err);
            }
            Color.find(function (err, colors) {
                if (err) {
                    console.log(err);
                }
                Location.find(function (err, locations) {
                    if (err) {
                        console.log(err);
                    }
                    // If cookies exist, render the page with those matched animals and keyword as parameters
                    // or show all the animals.
                    res.render('browse', {
                        title: 'Animals adoption page',
                        animals: req.signedCookies.animals ? req.signedCookies.animals : animals,
                        keyword: req.signedCookies.keyword ? req.signedCookies.keyword : '',
                        page: req.signedCookies.keyword ? 'search' : 'browse',
                        role: req.signedCookies.role,
                        total: req.signedCookies.animals ? req.signedCookies.animals.length : null,
                        colors: req.signedCookies.colors ? req.signedCookies.colors : colors,
                        locations: req.signedCookies.locations ? req.signedCookies.locations : locations
                    });
                });
            });
        });
    }
};

/**
 * When adding a new animal, we need to check if the color and location of the animal exist in the database.
 * If not, the color or the location is added to the database as a new tag.
 * After checking the color and location, the new animal is added to the animal's database.
 * @param req : The ajax request came from the add_animal_view for adding a new animal.
 * @param res : Response of the new added animal or any error message.
 */
exports.add = function (req, res) {
    var animalObj = req.body;

    // Find if the color of the animal exists or add a new color to the database
    Color.findOne({color: animalObj.animalColor}, function (err, color) {
        if (err) {
            console.log(err);
        }
        if (!color) {
            color = new Color({
                color: animalObj.animalColor,
                date: Date.now()
            });
            color.save(function (err, color) {
                console.log("Color saved.")
                if (err) {
                    console.log(err);
                }
            })
        } else {
            console.log("Color existed.")
        }
    })

    // Find if the location of the animal exists or add a new location to the database
    Location.findOne({location: animalObj.animalLocation}, function (err, location) {
        if (err) {
            console.log(err);
        }
        if (!location) {
            location = new Location({
                location: animalObj.animalLocation,
                date: Date.now()
            });
            location.save(function (err, location) {
                console.log("Location saved.")
                if (err) {
                    console.log(err);
                }
            })
        } else {
            console.log("Location existed.")
        }
    })

    //Add a new animal
    var animal = new Animal({
        name: animalObj.animalName,
        type: animalObj.animalType,
        image: (req.file.path.toString()).replace('public', ''),
        gender: animalObj.animalGender,
        color: animalObj.animalColor,
        location: animalObj.animalLocation,
        introduction: animalObj.animalIntroduction
    });
    animal.save(function (err, animals) {
        if (err) {
            res.setHeader('contentType', 'application/json');
            res.send({'message': 'Error: ' + err});
        }
        //After adding the animal, return back to home page (browsing page with all the animals listed)
        animal._doc.toURL = '/back';
        res.setHeader('contentType', 'application/json');
        res.send(JSON.stringify(animal));
    })
};

/**
 * Get the animal page of any one of the animals added.
 * @param req : request from browsing page with the animal id as a parameter
 * @param res : response to return (the animal page)
 */
exports.getInfo = function (req, res) {
    //The id of the animal selected
    var id = req.params._id;

    //Find the animal's information in the database using the animal's id
    Animal.findById(id, function (err, animals) {
        if (err) console.log(err);
        //Find all the comments under the animal's page in the comment's database
        Comment.fetch(id, (err, comments) => {
            if (err) console.log('Error: ' + err);
            //Render the page with the information founded
            res.render('detail', {
                title: 'Animal Page',
                animals: animals,
                comments: comments,
                id: id
            });
        });
    });
};