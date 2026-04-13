const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Temporary mock database for users
const users = [];

// @route POST /api/auth/register
// @desc Register a new user with validation
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // --- Validation ---
    if (!username || typeof username !== 'string' || username.trim().length < 3) {
      return res.status(400).json({ message: 'Validation Error: Username must be a string and at least 3 characters long' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ message: 'Validation Error: Password must be a string and at least 6 characters long' });
    }
    // ------------------

    const cleanUsername = username.trim();

    // Check if user already exists
    const userExists = users.find((u) => u.username === cleanUsername);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const newUser = { id: Date.now(), username: cleanUsername, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// @route POST /api/auth/login
// @desc Authenticate user & get token with validation
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // --- Validation ---
    if (!username || !password) {
      return res.status(400).json({ message: 'Validation Error: Both username and password are required' });
    }
    // ------------------

    const cleanUsername = username.trim();

    // Find the user
    const user = users.find((u) => u.username === cleanUsername);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User not found.' });
    }

    // Check the password against the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Password incorrect.' });
    }

    // Generate JSON Web Token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // Token expires in 2 hours
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

module.exports = router;
