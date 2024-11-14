import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import './App.css';  // Ensure CSS is correctly imported
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import images
import image1 from './images1.jpg';
import image2 from './images2.jpg';
import image3 from './images3.jpg';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([image1, image2, image3]); // Use imported image variables directly

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched products:", data);  // Debugging the fetched data
                setProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Ensure chart data is correctly populated
    const chartData = products.map(product => ({
        name: product.name,
        stockLevel: product.stockLevel || product.quantity || 0,  // Default to 0 if no stockLevel or quantity
    }));

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
    };

    return (
        <div className="dashboard-container">
            {/* Image carousel */}
            <div className="image-carousel">
                <Slider {...sliderSettings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h3>Product Dashboard</h3>
                    <div className="dashboard-navigation">
                        <button>
                            <Link to="/UserManagement">User Management</Link>
                        </button>
                        <button>
                            <Link to="/ProductManagement">Product Management</Link>
                        </button>
                        <button>
                            <Link to="/StockManagement">Stock Management</Link>
                        </button>
                    </div>
                </div>

                 {/* Debugging text */}

                <h3>Product List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                        
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                
                                    <td>{product.category}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No products available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Stock Level Graph */}
                <ResponsiveContainer width="100%" height={300} className="chart-container">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="stockLevel" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
