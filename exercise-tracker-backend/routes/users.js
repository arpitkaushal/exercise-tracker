const router = require('express').Router();
let User = require('../models/user.model');

// after someone requests rootaddress/users/  then that will handled by the code below
router.route('/').get((req,res) => {
    
    User.find()         // mongoose method that'll get a list of all the users in databse
        .then(users => res.json(users)) // return lis of users as json
        .catch(err => res.status(400).json('Error: '+err));
    });
    
    
    router.route('/add').post((req,res) => {
        const username = req.body.username; 
        const newUser = new User({username});

        newUser.save()
        .then( ()=>res.json('User added!'))
        .catch(err => res.status(400).json('Error: '+err));
});


module.exports = router;
