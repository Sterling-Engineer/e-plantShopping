import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: "$14" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3", description: "Calming scent, used in aromatherapy.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, used in teas and cooking.", cost: "$12" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress and promotes sleep.", cost: "$14" },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Beautiful flowering plant known for its fragrance.", cost: "$22" }
      ]
    },
    {
      category: "Health Beneficial Plants",
      plants: [
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2017/09/19/20/56/purple-coneflower-2766603_1280.jpg", description: "Contains Interferon, a protein that helps protect cells from viral infections.", cost: "$14" },
        { name: "Yarrow", image: "https://cdn.pixabay.com/photo/2022/07/20/17/48/yarrow-7334664_1280.jpg", description: "A versatile plant valued for its anti-inflammatory and digestive benefits.", cost: "$20" },
        { name: "Ginkgo", image: "https://media.istockphoto.com/id/149060779/photo/ginkgo-biloba-tree.jpg?s=1024x1024&w=is&k=20&c=P_mZmfLhbcITlBJ5GnQsZdBDhXM_DRfqladlYzpjpkI=", description: "Promoted for improving heart and brain function.", cost: "$14" },
        { name: "Ginseng", image: "https://images.unsplash.com/photo-1664388837927-fa6103cd5098?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688", description: "Supports energy, focus, and immune function.", cost: "$18" },
        { name: "Calendula", image: "https://images.unsplash.com/photo-1755932321316-84b012707f32?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169", description: "Used for treating wounds, rashes, and skin irritations.", cost: "$20" },
        { name: "Peppermint", image: "https://images.unsplash.com/photo-1648036933917-762235e009c7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", description: "Helps with digestion and nausea.", cost: "$14" }
      ]
    }
  ];

  const handleHomeClick = (e) => { e.preventDefault(); onHomeClick(); };
  const handleCartClick = (e) => { e.preventDefault(); setShowCart(true); };
  const handleContinueShopping = (e) => { e.preventDefault(); setShowCart(false); };

  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, quantity: 1 }));
  };

  const isInCart = (plant) => {
    const item = cartItems.find((i) => i.name === plant.name);
    return item?.quantity > 0;
  };

  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  return (
    <div>
      <div className="navbar">
        <a href="/" onClick={handleHomeClick}>Home</a>
        <a href="#" onClick={() => setShowCart(false)}>Plants</a>
        <a href="#" onClick={handleCartClick} className="cart-link">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-count">{calculateTotalQuantity()}</span>
          <span className="cart-text">Checkout</span>
        </a>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div className="category-section" key={index}>
              <h1>{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button
                      className={`product-button ${isInCart(plant) ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant)}
                    >
                      {isInCart(plant) ? '✔ Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
