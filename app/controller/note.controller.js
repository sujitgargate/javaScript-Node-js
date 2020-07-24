const NoteService=require('../services/notes.services');

class NoteController{
    constructor(){}

    addNote(req,res){
        var noteService=new NoteService();
        req.assert('title','title cant be blank').notEmpty();
        req.assert('Content','Content cant be empty').notEmpty();

        var errors = req.validationErrors();
        if(error){
            return res.status(400).send(error);
        }
        else{
            noteService.addNote(req,res);
        }

    }
}



module.export=NoteController;