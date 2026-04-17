import React, { useEffect, useState } from "react";
import API from '../api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // Remove item
  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Increase quantity
  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  // 🛒 CHECKOUT (FIXED)
  const handleCheckout = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const totalAmount = cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace("Rs.", ""));
      return total + itemPrice * item.quantity;
    }, 0);

    try {
      const res = await fetch("https://cafe-backend-new-f6fqc5aub6cfgfhv.uaenorth-01.azurewebsites.net/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "guest",
          items: cart.map((item) => ({
            name: item.title || item.name,
            price: parseFloat(item.price.replace("Rs.", "")),
            quantity: item.quantity,
          })),
          totalAmount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Order placed successfully!");
        localStorage.removeItem("cart");
        setCartItems([]);
      } else {
        alert(data.message || "Checkout failed");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong during checkout.");
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace("Rs.", ""));
        return total + itemPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="p-6 bg-[#f8f1e4] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#4b3621] text-center">
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-4 rounded shadow-md justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title || item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold text-[#4b3621]">
                    {item.title || item.name}
                  </h4>
                  <p className="text-sm text-gray-600">{item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(index)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(index)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(index)}
                className="text-red-600 font-bold"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between mt-6">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-semibold">
              Rs {calculateTotalPrice()}
            </span>
          </div>

          {/* Checkout */}
          <button
            onClick={handleCheckout}
            className="block mx-auto bg-[#4b3621] text-white px-6 py-2 rounded-lg hover:bg-[#6f4e37]"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;