//Dependencies
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const app = express();

//Routers
const user = require('./routes/user');
const studentHome = require('./routes/studentHome');
const student = require('./routes/student');
const certificate = require('./routes/certificate');
const relations = require('./routes/relations');

//Middleware
const cors = require('./middleware/cors');
const auth = require('./middleware/auth');
const {authPage} = require('./middleware/roles');
const index = require('./middleware/index');
const notFound = require('./middleware/notFound');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", index);
app.use("/user", user);
app.use(auth);
app.use("/studentHome", authPage(["Estudiante"]), studentHome);
app.use("/student", authPage(["Admin"]), student);
app.use("/certificate", authPage(["Admin"]), certificate);
app.use("/relations", authPage(["Admin"]), relations);
//añadir auth
app.use(notFound);

app.listen(process.env.PORT || 8081, ()=>{
    console.log("Server is running...")
});