require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const paymentRoutes = require('./routes/payment');
const { protect } = require('./middleware/authMiddleware');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payment', paymentRoutes);

// Config express to render statically uploaded image URLs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Protected Test Route (Using JWT Verification)
app.get('/api/protected', protect, (req, res) => {
  res.json({ 
    message: 'You have accessed a protected route!',
    user: req.user 
  });
});

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Ecommerce API backend with Advanced Features is operational.');
});

// Global Error Handler (mostly catching Multer file filter errors)
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend Server running securely on port ${PORT}`);
});
