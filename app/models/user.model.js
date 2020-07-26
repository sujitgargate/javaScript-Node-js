/***
 * models contains database designs and contains data standards eg. name:string, age:number
 */

var mongoose = require('mongoose');
/**
 * mongoose is provided by MongoDB which contains methods like findone(),save() etc. 
 */
const userSchema =mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    isVerified: { type: Boolean, default: false },
    isActive:{type: Boolean,default:true},
    isDelete:{type: Boolean,default:false},
    password: String
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema);