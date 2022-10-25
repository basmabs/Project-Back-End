const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/event_project').then(() => {
}).catch(error => {
  console.log(error)
});