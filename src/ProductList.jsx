import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/CartSlice"; // ✅ Import from your CartSlice
import "./ProductList.css"; // Optional if you have styles

const ProductList = ({ plantsArray }) => {
  // Initialize dispatch from Redux
  const dispatch = useDispatch();

  // State to track which products are added to cart
  const [addedToCart, setAddedToCart] = useState({});

  // ✅ Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch Redux action
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true, // Mark product as added locally
    }));
  };

  return (
    <div className="product-grid">
      {plantsArray.map((category, index) => (
        <div key={index}>
          <h1 className="category-title">{category.category}</h1>

          <div className="product-list">
            {category.plants.map((plant, plantIndex) => (
              <div className="product-card" key={plantIndex}>
                <img
                  className="product-image"
                  src={plant.image}
                  alt={plant.name}
                />
                <div className="product-title">{plant.name}</div>
                <div className="product-description">{plant.description}</div>
                <div className="product-cost">${plant.cost}</div>

                <button
                  className="product-button"
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedToCart[plant.name]}
                >
                  {addedToCart[plant.name] ? "Added ✔" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
