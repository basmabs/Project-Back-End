const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/event_project').then(() => {
  console.log('Database is running');
}).catch(error => {
  console.log(error)
});