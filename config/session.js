const session = require('express-session');

module.exports = session({
    secret: process.env.SESSION_SECRET || 'chota-bheem', 
    resave: false,
    saveUninitialized: false,
});
