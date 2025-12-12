import React, { useEffect, useState, useMemo } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { ShoppingCart, Trash2, Package } from "lucide-react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Total, setTotal] = useState(0);

  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }), []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-cart",
          { headers }
        );
        setCart(response.data.data);
        calculateTotal(response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [headers]);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price || 0), 0);
    setTotal(sum);
  };

  const deleteItem = async (bookId) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/remove-cart/${bookId}`,
        {},
        { headers }
      );
      const updatedCart = Cart.filter((item) => item._id !== bookId);
      setCart(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart.");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  const allBooks = async () => {
  navigate("/all-books")
}

  if (Cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zinc-800 mb-6">
            <ShoppingCart className="w-12 h-12 text-zinc-600" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-100 mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Add some books to get started!
          </p>
          <button
            className="px-8 py-3 bg-yellow-100 text-zinc-900 rounded-lg font-semibold hover:bg-yellow-200 transition-colors duration-200"
            onClick={allBooks}
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  const placeOrder = async () => {
  try {
    const orderPayload = Cart.map(item => ({ bookId: item._id.toString() }));

    const response = await axios.post(
      `http://localhost:1000/api/v1/place-order`,
      { order: orderPayload },
      { headers }
    );

    alert(response.data.message);
    setCart([]);
    setTotal(0);
    navigate("/profile/orderHistory");
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place order. Check console for details.");
  }
};



 
  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-100 mb-2">
            Shopping Cart
          </h1>
          <p className="text-zinc-400">
            {Cart.length} {Cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {Cart.map((item, i) => (
              <div
                key={i}
                className="bg-zinc-800 rounded-xl p-6 hover:bg-zinc-750 transition-colors duration-200 border border-zinc-700"
              >
                <div className="flex gap-6">
                  {/* Book Image */}
                  <div className="shrink-0">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-32 h-44 object-cover rounded-lg shadow-lg"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="grow min-w-0">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-zinc-100 line-clamp-2">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                      {item.desc}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-2xl font-bold text-yellow-100">
                        Rs. {item.price?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 sticky top-8">
              <h2 className="text-2xl font-bold text-zinc-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-zinc-300">
                  <span>Subtotal</span>
                  <span>Rs. {Total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-zinc-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-zinc-100">
                    <span>Total</span>
                    <span className="text-yellow-100">
                      Rs. {Total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-yellow-100 text-zinc-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-200 transition-colors duration-200 mb-4"
                onClick={placeOrder}
              >
                Proceed to Checkout
              </button>

              <button className="w-full bg-zinc-700 text-zinc-100 py-3 rounded-lg font-semibold hover:bg-zinc-600 transition-colors duration-200"
              onClick={allBooks}>
                Continue Shopping
              </button>

              <div className="mt-6 pt-6 border-t border-zinc-700">
                <div className="flex items-start gap-3 text-sm text-zinc-400">
                  <Package className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>
                    Free shipping on all orders. Estimated delivery in 3-5
                    business days.
                  </p>
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
