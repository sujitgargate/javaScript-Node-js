var mongoose = require('mongoose')
const Schema=mongoose.Schema;
const noteSchema = mongoose.Schema({
    title: String,
    content: {type: String, required: true},
    userId: {type:Schema.Types.ObjectId, ref: 'User'}
},
{
    timestamps:true
})

module.exports=mongoose.model('Notes',noteSchema);