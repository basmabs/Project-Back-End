/* Importing the express module. */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const port = 4000;
const passport = require('passport')
const path = require('path')

app = express();
dotenv.config();
require('./Connect/Connect');
require('./Passport/Bearer');

app.use(bodyParser.json({ limit: "52428800" }));
app.use(bodyParser.urlencoded({ limit: "52428800", extended: true, parameterLimit: 50000 }));

app.use(morgan('combined'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}));
app.use(express.urlencoded({ extended: false }));
app.use('/qrcodes', express.static(path.join(__dirname, 'qrcodes')));
app.use(require('express-session')({ secret: process.env.JWT_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs')


const authRoute = require('./Routes/Company_Auth_Route');
app.use('/', authRoute);
const apiRoute = require('./Routes/CompanyAPI');
app.use('/', apiRoute);
const eventRoute = require('./Routes/Events');
app.use('/', eventRoute);
const tagRoute = require('./Routes/Tag');
app.use('/', tagRoute);
const reservationRoute = require('./Routes/Reservation');
app.use('/', reservationRoute);
const contactUsRoute = require('./Routes/Contact-Us');
app.use('/', contactUsRoute)

app.listen(port, function () { console.log(`server is listening on port ${port}`) })