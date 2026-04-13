import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <header className="app-header">
            <Link to="/" className="app-brand">ShopSphere</Link>
            <nav className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/cart" className="nav-link cart-link">Cart</Link>
            </nav>
          </header>
          <main className="container">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
