var express = require('express');
var bodyParser = require('body-parser');
const noteRoute=require('./app/routes/note.routes');
var dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const app = express();
const database = require('./config/config.database');
var userRoute = require('./app/routes/user.router')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user',userRoute);

app.use('/note',noteRoute);
database.mongoose;

app.listen(port, () => {
    console.log("Server is listening on port ", port);
});