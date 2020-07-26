"use strict"
const Note = require('../models/notes.model')
var User = require('../models/user.model')
var userService = require('../services/user.service')
class NoteService {
    constructor() { }
    async addNote(req, res) {

        try {
            var user = await userService.getValidUserById(req.body.userId)
            if (!user) {
                var note = new Note({
                    title: req.body.title,
                    content: req.body.content,
                    userId: User._id
                })
                var noteResponse = await Note.create(note)
                res.send(noteResponse)
            }
            else {
                res.status(400).send({ msg: 'note not created' })
            }
        } catch (error) {
            throw new Error(error)
        }

    }
}
module.exports = NoteService;

