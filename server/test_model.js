
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simple-app')
    .then(async () => {
        console.log('DB Connected');
        try {
            console.log('Attempting to create user...');
            const user = await User.create({
                name: 'TestUser',
                email: 'test' + Date.now() + '@example.com',
                password: 'password123'
            });
            console.log('User created:', user);
        } catch (error) {
            console.error('Model Error:', error);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => {
        console.error('DB Connection Error:', err);
    });
