const mongoose = require('mongoose');
const database = require('./config/keys').mongoURI;

mongoose
    .connect(database)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));