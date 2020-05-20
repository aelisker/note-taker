const router = require('express').Router();
const { notes } = require('../../db/db.json');
const path = require("path");
const fs = require("fs");

router.get('/notes', (req, res) => {
    console.log('Loading notes');
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

router.post('/notes', (req, res) => {
    console.log('Save has been clicked');
    console.log(req.body);
})

// router.post('/animals', (req, res) => {
//   //set id based on what the next index of the array will be
//   req.body.id = animals.length.toString();

//   //if any data in req.body is incorrect, send 400 err
//   if (!validateAnimal(req.body)) {
//     res.status(400).send('The animal is not properly formatted.');
//   } else {
//     //add animal to json file and animals array in this function
//     const animal = createNewAnimal(req.body, animals);
//     res.json(animal);
//   }
// });

module.exports = router;