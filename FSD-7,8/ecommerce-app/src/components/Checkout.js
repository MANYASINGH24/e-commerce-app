import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Use cart.reduce to calculate the total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with us. Returning to home...</p>
      </div>
    );
  }

  return (
    <div className="checkout-panel">
      <h2>Complete Your Purchase</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Review your order and click place order to complete.
      </p>
      
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Total Items: {cart.length}</div>
        <div className="total-price">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
      
      <button 
        className="btn btn-success" 
        onClick={handlePlaceOrder}
        style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem' }}
        disabled={cart.length === 0}
      >
        Place Order
      </button>

      {cart.length === 0 && (
        <p style={{ marginTop: '1rem', color: 'var(--danger)' }}>
          Your cart is empty. Please add items before checking out.
        </p>
      )}
    </div>
  );
};

export default Checkout;
