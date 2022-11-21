const Company = require('../Models/Company_Auth_Model');
const passport = require('passport');
const bearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
passport.use(new bearerStrategy((token, done) => {
  console.log(token)
  if (token == 'null') { return }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodeData)
  Company.findById(decodeData.ID_COMPANY, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false) }
    return done(null, user, { scope: 'all' })
  })
}
));