import React, { useState, useEffect } from 'react';
import './App.css';

const StockManagement = () => {
  const [products, setProducts] = useState([]);

  // Fetch products data from backend
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Handle selling product (decrease quantity by 1)
  const sellProduct = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity -= 1;
      // Update the product on the backend
      fetch(`http://localhost:5000/products/${updatedProducts[index].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProducts[index]),
      })
        .then((response) => response.json())
        .then(() => {
          setProducts(updatedProducts); // Update the products in state
        })
        .catch((error) => console.error('Error selling product:', error));
    }
  };

  // Handle deleting a product
  const deleteProduct = (index) => {
    const productId = products[index].id;
    fetch(`http://localhost:5000/products/${productId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <div id="stock-management">
      <h2>Stock Management</h2>

      {/* Product List Table */}
      <h3>Product List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product Name</th>
            
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.name}</td>
              
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.category}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>${product.price}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.quantity}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button
                    onClick={() => sellProduct(index)}
                    disabled={product.quantity <= 0}
                  >
                    Sell
                  </button>
              
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>
                No products available. Please add products first.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockManagement;
