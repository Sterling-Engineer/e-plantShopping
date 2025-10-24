import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate subtotal for a single item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  // Calculate total cost for all items
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += calculateTotalCost(item);
    });
    return total.toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
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
            <button onClick={handleCheckoutShopping}>Checkout</button>
            <button onClick={onContinueShopping}>Continue Shopping</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
