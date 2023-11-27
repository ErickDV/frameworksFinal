//Dependencies
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const app = express();

//Routers
const user = require('./routes/user');
const student = require('./routes/student');
const certificate = require('./routes/certificate');
const relations = require('./routes/relations');

//Middleware
const cors = require('./middleware/cors');
const auth = require('./middleware/auth');
const index = require('./middleware/index');
const notFound = require('./middleware/notFound');
const studentD = require('./routes/studentD')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", index);
app.use("/user", user);
app.use("/student", student);
app.use("/studentD", studentD);
app.use("/certificate", certificate);
app.use("/relations", relations);
//añadir auth
app.use(notFound);

app.listen(process.env.PORT || 8081, ()=>{
    console.log("Server is running...")
});