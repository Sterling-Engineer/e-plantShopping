import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate subtotal for a single item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  // Calculate total amount for all items
  const calculateTotalAmount = () => {
    const total = cartItems.reduce((sum, item) => {
      return sum + calculateTotalCost(item);
    }, 0);
    return total.toFixed(2);
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity or remove item if it would reach zero
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Continue Shopping - call parent handler
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // 🛒 Checkout placeholder
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert("🛒 Checkout Coming Soon! Stay tuned for updates.");
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Plant</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td>{item.cost}</td>
                  <td>
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </td>
                  <td>${calculateTotalCost(item).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemove(item)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Total Amount: ${calculateTotalAmount()}</h3>
            <div className="actions">
              <button
                className="checkout-button"
                onClick={handleCheckoutShopping}
              >
                Checkout
              </button>
              <button
                className="continue-button"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
