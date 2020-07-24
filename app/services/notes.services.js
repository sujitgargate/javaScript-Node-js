"use strict"
const Note=require('../models/notes.model');
const User=require('../models/user.model');
class NoteService{

    constructor(){}
    async addNote(req,res){
        try {
            var userExists= await User.findOne(
                {
                    _id:req.body.userId
                })
            if(user){
                var note = new Note({
                    title:req.body.title,
                    content:req.body.content
                })
                var noteResponse = await Note.create(note);
                res.send(noteResponse)

            }
            else{
                res.send({ message : 'invalid User'})
            }
        } catch (error) {
            throw new Error(error);
            
        }
    }
}
module.export=NoteService;