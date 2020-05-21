const router = require('express').Router();
const path = require("path");
const fs = require("fs");

let noteArr = []

router.get('/notes', (req, res) => {
    // read json file from db, set as noteArr
    noteArr = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json')));

    // send array back as json response object
    res.json(noteArr);
});

router.post('/notes', (req, res) => {
    // avoid global when possible
    const localNoteArr = noteArr;

    // had planned to use array length to set ID, but if some but not all notes deleted and new note added, could cause ID conflict
    // instead chose to go through all existing notes and find highest current value
    let highestId = 0;
    if (localNoteArr.length > 0) {
        localNoteArr.forEach(note => {
            if (note.id > highestId) {
                highestId = note.id;
            }
        });
    }
    // set ID equal to current highest plus one to avoid any issues deleting based on ID
    req.body.id = highestId + 1;

    // push new note (request body) to note array
    localNoteArr.push(req.body);

    // save stringified json to db, send array back as response object
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(localNoteArr));
    res.json(localNoteArr);
});


router.delete('/notes/:id', (req, res) => {
    // avoid global when possible
    const localNoteArr = noteArr;
    const idToDelete = Number(req.params.id); 

    const arrWithoutDeletedNote = localNoteArr.filter(note => note.id !== idToDelete);

    // if json file exists, delete
    // found information on deleting on last comment on issue https://github.com/nodejs/node-v0.x-archive/issues/4965
    if (fs.existsSync(path.join(__dirname, '../../db/db.json'))) {
        fs.unlinkSync(path.join(__dirname, '../../db/db.json'));
    }

    // save notes in same way as POST request with new array
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(arrWithoutDeletedNote));
    res.json(arrWithoutDeletedNote);
});

module.exports = router;