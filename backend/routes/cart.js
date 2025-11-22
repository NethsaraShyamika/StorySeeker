const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("../middlewares/userAuth");


//add book to cart
router.put("/add-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);

    const isInCart = user.cart.includes(bookid);
    if (isInCart) {
      return res.status(400).json({ error: "Book already in cart" });
    }

    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({ message: "Book added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/remove-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);
    const isInCart = user.cart.includes(bookid);
    if (!isInCart) {
      return res.status(400).json({ error: "Book not found in cart" });
    }
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    return res.status(200).json({ message: "Book removed from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("cart");
    const cart = user.cart.reverse();
    return res.json({
        status: "success",
        data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
