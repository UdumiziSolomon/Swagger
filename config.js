    'use strict';
const mongoose  = require('mongoose');

const connection = mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, err => {
    !err ? console.debug('DB is ON') : err ;
});


module.exports = connection ;