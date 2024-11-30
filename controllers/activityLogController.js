const ActivityLog = require('../models/ActivityLog');

async function viewActivityLogs(req, res) {
    try {
        const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(50);
        res.render('activityLogs', { logs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching activity logs');
    }
}

module.exports = { viewActivityLogs };
