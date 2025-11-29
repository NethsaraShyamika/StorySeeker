const router = require("express").Router();
const mongoose = require("mongoose");
const authenticateToken = require("../middlewares/userAuth");
const authorizeAdmin = require("../middlewares/adminAuth");
const User = require("../models/user");
const Order = require("../models/order");

// PLACE ORDER - one order per book
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    if (!order || !Array.isArray(order) || order.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No books provided in the order",
      });
    }

    for (const orderData of order) {
      if (!orderData.bookId) continue;

      const newOrder = new Order({
        user: mongoose.Types.ObjectId(id),
        book: [mongoose.Types.ObjectId(orderData.bookId)],
      });

      const savedOrder = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: savedOrder._id },
        $pull: { cart: mongoose.Types.ObjectId(orderData.bookId) },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET USER ORDER HISTORY
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book", select: "title author price category" },
      options: { sort: { createdAt: -1 } },
    });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      orders: userData.orders,
    });

  } catch (error) {
    console.error("Error fetching order history:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
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

    return res.status(200).json({
      success: true,
      orders: ordersData,
    });

  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
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
        success: false,
        message: "Invalid status value",
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
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
