const dotenv= require('dotenv'); //dotenv file used for loading environmetal variables
dotenv.config();  // .config() reads the data from .env file and parses into "process.env"
const mongoose =require('mongoose');

const url= process.env.DATABASE;

mongoose.connect(url,{
    useNewUrlParser:true        
})
.then(()=>{
    console.log('sucessfully connceted to DB');
    
})
.catch(err=>{
    console.log('Error ocuuured while conecting ' +err);
    process.exit();
})