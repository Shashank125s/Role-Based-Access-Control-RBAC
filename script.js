const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { isAuthenticated, hasRole } = require('./middleware/auth');
const authController = require('./controllers/authController');
const resourceController = require('./controllers/resourceController');
const activityLogController = require('./controllers/activityLogController');
const sessionConfig = require('./config/session');
const app = express();
const newUser = require('./models/User');
const flash = require('connect-flash');

app.use(flash());


app.use(sessionConfig);
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => res.render('index'));

app.get('/login', (req, res) => res.render('login', { error: null }));
app.post('/login', authController.login);

app.get('/register', (req, res) => res.render('register'));
app.post('/register', authController.register);

app.get('/logout', authController.logout);

app.get('/dashboard', isAuthenticated, (req, res) => res.render('dashboard', { user: req.session.user }));

app.get('/userResource', isAuthenticated, hasRole('user'), resourceController.userResource);
app.get('/moderatorResource', isAuthenticated, hasRole('moderator'), resourceController.moderatorResource);
app.get('/adminResource', isAuthenticated, hasRole('admin'), resourceController.adminResource);

app.get('/activityLogs', isAuthenticated, hasRole('admin'), activityLogController.viewActivityLogs);

app.get('/admin/viewUsers', isAuthenticated, hasRole('admin'), authController.viewUsers);


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
