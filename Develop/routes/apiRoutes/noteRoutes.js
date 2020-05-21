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

    // had planned to use array length to set ID, but if some but not all notes deleted and new note added, could cause ID conflict
    // instead chose to go through all existing notes and set ID to one higher than current highest
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
});

module.exports = router;