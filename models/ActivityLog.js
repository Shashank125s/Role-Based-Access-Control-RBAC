const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    username: { type: String, required: true },
    role: { type: String, required: true }, 
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

module.exports = ActivityLog;
