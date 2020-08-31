const express = require('express');
const router = express.Router();
var multer = require('multer');
const User = require('../controllers/user_control');
const Animal = require('../controllers/animal_control');
const Comment = require('../controllers/comment_control');
const Applicant = require('../controllers/applicant_control');

// storage defines the storage options to be used for file upload with multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, 'public/uploads/');
        cb(null, 'public/images/uploads/')
    },
    filename: function (req, file, cb) {
        var original = file.originalname;
        var file_extension = original.split(".");
        // Make the file name the date + the file extension
        filename =  Date.now() + '.' + file_extension[file_extension.length-1];
        cb(null, filename);
    }
});
var upload = multer({ storage: storage });


//Login page
router.get('/', function(req, res, next) {
    res.render('login', {title: 'login page'});
});

router.post('/', function(req, res){
    User.login(req, res);
});

//Registration page
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Registering Page' });
});

router.post('/register', function(req, res){
    User.register(req, res);
});

//Browsing page (with query from search)
router.get('/browse', function(req, res){
    console.log(req.query);
    Animal.list(req, res);
});

//Add new animal page
router.get('/add', function(req, res, next) {
    res.render('add_animal', {title: 'Add Animal'});
});

router.post('/add', upload.single('animalImage'), function(req, res){
    console.log(req);
    Animal.add(req, res);
});

//Animal page (for each specific animal)
router.get('/animal/:_id', function(req, res, next) {
    Animal.getInfo(req, res);
});
//When someone posting a new comment
router.post('/animal/:_id', function(req, res){
    Comment.newComment(req, res);
});

//Applying page
router.get('/animal/:_id/apply', function(req, res){
    res.render('apply', {title: 'Apply for an animal', id: req.params._id});
});

router.post('/animal/:_id/apply', function(req, res){
    Applicant.apply(req, res);
});

//Thank you page
router.get('/thankyou', function(req,res){
    res.render('thankyou', {title: "Thank You for Your Adoption!!"})
});

//Clear the cookie of role and logout
router.get('/logout', function(req, res){
    res.clearCookie('role', {path: '/'});
    res.clearCookie('animals', {path: '/'});
    res.clearCookie('keyword', {path: '/'});
    console.log('Cookie cleared...');
    res.redirect('/');
});

//Clear all the cookie about animals searched and go back to the home page (browsing page with all the animals)
router.get('/back', function(req, res){
    res.clearCookie('animals', {path: '/'});
    res.clearCookie('keyword', {path: '/'});
    console.log('Cookie cleared...');
    res.redirect('/browse');
});

module.exports = router;
