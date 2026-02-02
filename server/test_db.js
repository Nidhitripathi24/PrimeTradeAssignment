const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('Testing MongoDB Connection...');
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simple-app')
    .then(() => {
        console.log('✓ MongoDB Connected Successfully');
        mongoose.connection.close();
        process.exit(0);
    })
    .catch(err => {
        console.error('✗ MongoDB Connection Error:', err.message);
        process.exit(1);
    });
