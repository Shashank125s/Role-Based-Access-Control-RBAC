const { isAuthenticated, hasRole } = require('../middleware/auth');

function userResource(req, res) {
    res.render('userResource',{ user: req.session.user });;
}

function moderatorResource(req, res) {
    res.render('moderatorResource', { user: req.session.user });
}

function adminResource(req, res) {
    res.render('adminResource', { user: req.session.user });
}

module.exports = { userResource, moderatorResource, adminResource };
