import React, { useEffect, useState, useMemo } from "react";
import { ShoppingCart, Trash2, Package, Plus, Minus, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [removing, setRemoving] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }), []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
        setCart(response.data.data);
        
        const initialQuantities = {};
        response.data.data.forEach(item => {
          initialQuantities[item._id] = 1;
        });
        setQuantities(initialQuantities);
        
        calculateTotal(response.data.data, initialQuantities);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [headers]);

  const calculateTotal = (items, qtys = quantities) => {
    const sum = items.reduce((acc, item) => acc + ((item.price || 0) * (qtys[item._id] || 1)), 0);
    setTotal(sum);
  };

  const updateQuantity = (bookId, change) => {
    setQuantities(prev => {
      const newQty = Math.max(1, Math.min(10, (prev[bookId] || 1) + change));
      const updated = { ...prev, [bookId]: newQty };
      calculateTotal(cart, updated);
      return updated;
    });
  };

  const deleteItem = async (bookId) => {
    setRemoving(bookId);
    try {
      await axios.put(`http://localhost:1000/api/v1/remove-cart/${bookId}`, {}, { headers });
      const updatedCart = cart.filter(item => item._id !== bookId);
      const updatedQuantities = { ...quantities };
      delete updatedQuantities[bookId];
      setCart(updatedCart);
      setQuantities(updatedQuantities);
      calculateTotal(updatedCart, updatedQuantities);
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart.");
    } finally {
      setRemoving(null);
    }
  };

  const placeOrder = async () => {
    setOrderLoading(true);
    try {
      const orderPayload = cart.map(item => ({ 
        bookId: item._id.toString(),
        quantity: quantities[item._id] || 1
      }));

      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: orderPayload },
        { headers }
      );

      setShowSuccess(true);
      setTimeout(() => {
        setCart([]);
        setTotal(0);
        setQuantities({});
        navigate("/profile/orderHistory");
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert(error.response?.data?.message || "Failed to place order.");
    } finally {
      setOrderLoading(false);
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;
    
    try {
      await Promise.all(cart.map(item => 
        axios.put(`http://localhost:1000/api/v1/remove-cart/${item._id}`, {}, { headers })
      ));
      setCart([]);
      setQuantities({});
      setTotal(0);
    } catch (error) {
      alert("Failed to clear cart");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-zinc-900">
        <Loader />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-zinc-800 mb-6 animate-pulse">
            <ShoppingCart className="w-16 h-16 text-zinc-600" />
          </div>
          <h2 className="text-4xl font-bold text-zinc-100 mb-4">Your Cart is Empty</h2>
          <p className="text-zinc-400 text-lg mb-8">Start exploring our collection and add some amazing books to your cart!</p>
          <button
            className="px-8 py-4 bg-linear-to-r from-yellow-400 to-yellow-500 text-zinc-900 rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={() => navigate("/all-books")}
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  const itemCount = cart.reduce((sum, item) => sum + (quantities[item._id] || 1), 0);
  const savings = cart.reduce((sum, item) => sum + (item.originalPrice ? (item.originalPrice - item.price) * (quantities[item._id] || 1) : 0), 0);

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4 sm:px-6 lg:px-8">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold">Order placed successfully!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-2">Shopping Cart</h1>
              <p className="text-zinc-400 text-lg">
                {itemCount} {itemCount === 1 ? "item" : "items"} ({cart.length} {cart.length === 1 ? "book" : "books"})
              </p>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className={`bg-zinc-800 rounded-xl p-6 border border-zinc-700 transition-all duration-300 ${
                  removing === item._id ? "opacity-50 scale-95" : "hover:border-zinc-600 hover:shadow-lg"
                }`}
              >
                <div className="flex gap-6">
                  <div className="shrink-0">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-28 h-40 md:w-32 md:h-44 object-cover rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/128x176?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="grow min-w-0 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-zinc-100 line-clamp-2 mb-1">
                          {item.title}
                        </h3>
                        {item.author && (
                          <p className="text-zinc-400 text-sm">by {item.author}</p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteItem(item._id)}
                        disabled={removing === item._id}
                        className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200 disabled:opacity-50"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {item.desc && (
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{item.desc}</p>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-auto">
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-400 text-sm font-medium">Quantity:</span>
                        <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-700">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="p-2 hover:bg-zinc-800 transition-colors rounded-l-lg"
                            disabled={quantities[item._id] <= 1}
                          >
                            <Minus className="w-4 h-4 text-zinc-400" />
                          </button>
                          <span className="px-4 py-2 font-semibold text-zinc-100 min-w-12 text-center">
                            {quantities[item._id] || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="p-2 hover:bg-zinc-800 transition-colors rounded-r-lg"
                            disabled={quantities[item._id] >= 10}
                          >
                            <Plus className="w-4 h-4 text-zinc-400" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-yellow-100">
                          Rs. {((item.price || 0) * (quantities[item._id] || 1)).toLocaleString()}
                        </div>
                        <div className="text-sm text-zinc-400">
                          Rs. {(item.price || 0).toLocaleString()} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 sticky top-8">
              <h2 className="text-2xl font-bold text-zinc-100 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-zinc-300">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Savings</span>
                    <span>- Rs. {savings.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-zinc-300">
                  <span>Shipping</span>
                  <span className="text-green-400 font-semibold">Free</span>
                </div>
                
                <div className="flex justify-between text-zinc-300">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <div className="border-t border-zinc-700 pt-4">
                  <div className="flex justify-between text-2xl font-bold text-zinc-100">
                    <span>Total</span>
                    <span className="text-yellow-100">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={orderLoading}
                className="w-full bg-linear-to-r from-yellow-400 to-yellow-500 text-zinc-900 py-4 rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 mb-4 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {orderLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <button
                onClick={() => navigate("/all-books")}
                className="w-full bg-zinc-700 text-zinc-100 py-3 rounded-lg font-semibold hover:bg-zinc-600 transition-colors duration-200"
              >
                Continue Shopping
              </button>

              <div className="mt-6 space-y-4">
                <div className="pt-6 border-t border-zinc-700">
                  <div className="flex items-start gap-3 text-sm text-zinc-400">
                    <Package className="w-5 h-5 shrink-0 mt-0.5 text-green-400" />
                    <p>Free shipping on all orders. Estimated delivery in 3-5 business days.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-zinc-400">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-blue-400" />
                  <p>Secure checkout with buyer protection.</p>
                </div>

                <div className="flex items-start gap-3 text-sm text-zinc-400">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-purple-400" />
                  <p>Easy returns within 30 days of delivery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;