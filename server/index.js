const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simple-app')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes (Placeholder)
app.get('/', (req, res) => {
    res.send('API is running');
});

// Import Routes
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
