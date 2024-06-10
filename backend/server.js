const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: 'https://login-register-chi-woad.vercel.app', 
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
