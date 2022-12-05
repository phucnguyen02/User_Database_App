const { reset } = require('nodemon');
var Userdb = require('../model/model');

// create and save new user in database
exports.create = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({ message: "User info cannot be empty"});
        return;
    }

    // new user
    const user = new Userdb({ 
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // store user in database
    user
        .save(user)
        .then(data => {
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while executing the create operation"
            });
        });
}

//retrieve database of users
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Unable to find user with id " + id})
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: "An error occurred in retrieving user with id " + id})
        })
    }

    else{
        Userdb.find()
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred while executing this operation"})
        });
    }
}

// update a user by their id
exports.update = (req, res) => {
    if(!req.body){
        return res
        .status(400)
        .send({ message: "Data to update cannot be empty"});
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({message: `Cannot update user with ${id}. User not found.`})
        }
        else{
            res.send(data);
        }
    })
    .catch(err => {
        res.stauts(500).send({ message: "An error occurred while updating user information"})
    })
}

// delete a user from the database
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: `Cannot delete with ID${id}. ID is incorrect`})
        }
        else{
            res.send({
                message: "User was deleted successfully."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete user with ID = " + id
        });
    });
}