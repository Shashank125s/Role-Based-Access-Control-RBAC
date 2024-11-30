const bcrypt = require('bcrypt');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const newUser = require('../models/User');

async function register(req, res) {
    const { username, password, role, email } = req.body;
    if (!username || !password || !role || !email) {
        return res.send('Please enter all fields');
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.redirect('login', { error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            role: role,
        });

        await newUser.save();
        console.log('User created successfully');
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        req.flash('error', 'Please fill in all fields');
        return res.redirect('/login');
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { error: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.render('login', { error: 'Invalid username or password' });
        }

        req.session.user = { username: user.username, role: user.role };
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

async function viewUsers(req, res) {
    try {
        const users = await newUser.find({ role: { $in: ['user', 'moderator'] } });

        res.render('viewUsers', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
}

function logout(req, res) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const { username, role } = req.session.user;

    const log = new ActivityLog({
        username,
        action: 'Logged out',
        role,
        timestamp: new Date(),
    });

    log.save().then(() => {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }).catch((err) => {
        console.error('Error logging activity:', err);
        res.status(500).send('Error during logout');
    });
}


module.exports = { register, login, logout, viewUsers };
