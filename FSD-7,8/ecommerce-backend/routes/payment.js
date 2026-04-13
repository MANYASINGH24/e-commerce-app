const express = require('express');
const router = express.Router();

// @route POST /api/payment/mock
// @desc Dummy API for processing simulated payments with validation
router.post('/mock', (req, res) => {
  const { amount, cardNumber } = req.body;

  // Basic Validation
  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid or missing amount. Must be greater than 0.' });
  }
  if (!cardNumber || String(cardNumber).length < 12) {
    return res.status(400).json({ success: false, message: 'Invalid card number length. Provide at least 12 digits.' });
  }

  // Simulate remote processing network delay
  setTimeout(() => {
    // 80% Success Rate Simulation to test successful and failing endpoints manually
    const isSuccess = Math.random() > 0.2;

    if (isSuccess) {
      res.status(200).json({
        success: true,
        message: 'Payment processed successfully',
        transactionId: 'TXN-' + Math.floor(Math.random() * 1000000)
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment failed due to insufficient funds or bank decline. Please try again.'
      });
    }
  }, 1000);
});

module.exports = router;
