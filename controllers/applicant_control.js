var mongoose = require('mongoose');
var Applicant = require('../models/applicants_model');
var Animal = require('../models/animals_model');

/**
 * Create new applicant and update the animal's status to adopted (status = 1)
 * @param req : request to apply for an animal, with the applicant's information
 * @param res : respond any issue happens during saving the applicant or updating the animal information
 */
exports.apply = function(req, res){
    //Applicant's data
    var applicantData = req.body;
    //The id of the animal to be adopted
    var id = req.params._id;
    var newApplicant = new Applicant({
        firstName: applicantData.firstname,
        lastName: applicantData.lastname,
        dob: applicantData.dob,
        email: applicantData.email,
        animal: id
    });

    newApplicant.save(function(err){
        if (err) {
            res.setHeader('contentType', 'application/json');
            res.send({'message': 'Error: ' + err});
        }
        //Update the adopted animal's status to 1 (adopted)
        Animal.updateOne({_id: id}, {$set:{status: 1}}, (err, doc)=>{
            if(err) {
                res.setHeader('contentType', 'application/json');
                res.send({'message': 'Error: ' + err});
            }
            console.log(doc);
        });
        //Redirect to thank you page
        newApplicant._doc.toURL = '/thankyou';
        res.setHeader('contentType', 'application/json');
        res.send(JSON.stringify(newApplicant));
    });
};