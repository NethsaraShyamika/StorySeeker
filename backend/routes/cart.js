const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("../middlewares/userAuth");

// Add book to cart
router.put("/add-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isInCart = user.cart.includes(bookid);
    if (isInCart) {
      return res.status(400).json({
        success: false,
        message: "Book already in cart",
      });
    }

    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

    return res.status(200).json({
      success: true,
      message: "Book added to cart",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Remove book from cart
router.put("/remove-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isInCart = user.cart.includes(bookid);
    if (!isInCart) {
      return res.status(400).json({
        success: false,
        message: "Book not found in cart",
      });
    }

    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });

    return res.status(200).json({
      success: true,
      message: "Book removed from cart",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Get user cart
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("cart");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const cart = user.cart.reverse();
    return res.status(200).json({
      success: true,
      data: cart,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
