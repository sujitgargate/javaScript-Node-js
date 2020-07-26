var express = require('express')
const router = express.Router();
expressValidator = require('express-validator')
var NoteController = require('../Controller/note.controller');
var noteController = new NoteController()
router.use(expressValidator())
router.post('/addnote',noteController.addNote)
module.exports = router;
