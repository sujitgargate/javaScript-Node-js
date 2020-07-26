var NoteService = require('../services/notes.services');

class NoteController{
    constructor(){

    }
    addNote(req,res){
    var noteService = new NoteService()
    req.assert('title', 'Title cannot be blank').notEmpty();
    req.assert('content', 'Content cannot be empty').notEmpty();

    var errors = req.validationErrors();
    
    if(errors){ 
        return res.status(400).send(errors); 
    }
    else{
        noteService.addNote(req,res)
    }
    }
}

module.exports= NoteController;