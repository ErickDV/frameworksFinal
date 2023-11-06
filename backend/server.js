//Dependencies
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const app = express();

//Routers
const user = require('./routes/user');

//Middleware
const cors = require('./middleware/cors');
const auth = require('./middleware/auth');
const index = require('./middleware/index');
const notFound = require('./middleware/notFound');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", index);
app.use("/user", user);
//añadir auth
app.use(notFound);

app.listen(process.env.PORT || 8081, ()=>{
    console.log("Server is running...")
});