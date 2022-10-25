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
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs')

const router = require('./Routes/Company_Route');
app.use('/', router);
app.listen(port, function () { console.log(`server is listening on port ${port}`) })