import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProduct(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="detail-view">
      <img src={product.image} alt={product.title} className="detail-image" />
      <div className="detail-info">
        <div className="detail-category">{product.category}</div>
        <h2 className="detail-title">{product.title}</h2>
        <div className="product-price" style={{ fontSize: '2rem' }}>${product.price.toFixed(2)}</div>
        <p className="detail-desc">{product.description}</p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            className={`btn ${added ? 'btn-success' : 'btn-primary'}`} 
            onClick={handleAddToCart}
            style={{ flex: 1, padding: '1rem', fontSize: '1.2rem' }}
          >
            {added ? 'Added to Cart ✓' : 'Add to Cart — $'+product.price.toFixed(2)}
          </button>
          <button 
            className="btn btn-primary" 
            style={{ background: 'var(--surface-hover)', flex: 0.5 }}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
