import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h2 style={{ marginBottom: '1rem' }}>Your Cart is Empty</h2>
        <p style={{ marginBottom: '2rem' }}>Looks like you haven't added any products yet.</p>
        <Link to="/" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Shopping Cart ({cart.length} items)</h2>
        <button className="btn btn-success" onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </button>
      </div>
      <ul className="cart-list">
        {cart.map((item, index) => (
          <li className="cart-item" key={`${item.id}-${index}`}>
            <img src={item.image} alt={item.title} className="cart-item-img" />
            <div className="cart-item-info">
              <h3 className="cart-item-title">{item.title}</h3>
              <div className="cart-item-price">${item.price.toFixed(2)}</div>
            </div>
            <button 
              className="btn btn-danger" 
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
