const router = require("express").Router();
const mongoose = require("mongoose");
const authenticateToken = require("../middlewares/userAuth");
const authorizeAdmin = require("../middlewares/adminAuth");
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");

// PLACE ORDER - one order per book
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    if (!order || !Array.isArray(order) || order.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No books provided in the order"
      });
    }

    for (const orderData of order) {
      if (!orderData.bookId) continue; // skip invalid entries

      const newOrder = new Order({
        user: new mongoose.Types.ObjectId(id),
        book: [new mongoose.Types.ObjectId(orderData.bookId)]
      });

      const savedOrder = await newOrder.save();

      // Atomic update to user's orders array and remove book from cart
      await User.findByIdAndUpdate(id, {
        $push: { orders: savedOrder._id },
        $pull: { cart: new mongoose.Types.ObjectId(orderData.bookId) }
      });
    }

    return res.json({
      status: "success",
      message: "Order placed successfully"
    });

  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
});

// GET USER ORDER HISTORY
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { 
        path: "book", 
        select: "title author price category" // select only necessary fields
      },
      options: { sort: { createdAt: -1 } } // latest orders first
    });

    if (!userData) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    return res.json({
      status: "success",
      orders: userData.orders
    });

  } catch (error) {
    console.error("Error fetching order history:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
});

// GET ALL ORDERS (Admin)
router.get("/get-all-orders", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const ordersData = await Order.find()
      .populate({ path: "book", select: "title author price category" })
      .populate({ path: "user", select: "username email" })
      .sort({ createdAt: -1 });

    return res.json({
      status: "success",
      orders: ordersData
    });

  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
});

// UPDATE ORDER STATUS (Admin)
router.put("/update-order-status/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "shipped", "delivered", "cancelled"].includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid status value"
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate({ path: "book", select: "title author price category" })
      .populate({ path: "user", select: "username email" });

    if (!updatedOrder) {
      return res.status(404).json({
        status: "error",
        message: "Order not found"
      });
    }

    return res.json({
      status: "success",
      message: "Order status updated successfully",
      order: updatedOrder
    });

  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
});

module.exports = router;
