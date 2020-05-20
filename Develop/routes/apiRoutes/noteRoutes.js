const router = require('express').Router();
const { notes } = require('../../db/db.json');
const path = require("path");
const fs = require("fs");

let noteArr = []

router.get('/notes', (req, res) => {
    console.log('Loading notes');
    noteArr = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json')));
    console.log('Notes assigned to array');
    console.log(noteArr);
    res.json(noteArr);
});

router.post('/notes', (req, res) => {
    console.log('Save has been clicked');
    console.log(req.body);

    let highestId = 0;
    const localNoteArr = noteArr;
    if (localNoteArr.length > 0) {
        localNoteArr.forEach(note => {
            if (note.id > highestId) {
                console.log(`Note ID: ${note.id}`);
                console.log(`Highest ID: ${highestId}`);
                highestId = note.id;
            }
        });
    }
    req.body.id = highestId + 1;

    localNoteArr.push(req.body);
    console.log(localNoteArr);

    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(localNoteArr));
    res.json(localNoteArr);
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