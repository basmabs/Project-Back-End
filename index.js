/* Importing the express module. */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const port = 4000;
app = express();
dotenv.config();
require('./Connect/Connect');
require('./Passport/Bearer');

app.use(bodyParser.json({limit:"52428800"}));
app.use(morgan('combined'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}));
app.set('view engine', 'ejs')
const authRoute = require('./Routes/Company_Auth_Route');
app.use('/', authRoute);
const apiRoute = require('./Routes/CompanyAPI');
app.use('/', apiRoute);
const eventRoute = require('./Routes/Events');
app.use('/', eventRoute);
app.listen(port, function () { console.log(`server is listening on port ${port}`) })