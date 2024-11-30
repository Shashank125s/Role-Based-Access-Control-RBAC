const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/VRC', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const userschema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['user', 'moderator', 'admin'] } 
});

const User = mongoose.model('User', userschema);
module.exports = User;