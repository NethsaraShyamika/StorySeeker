const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("../middlewares/userAuth");

//add book to favourite
router.put("/add-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    const id = req.userId;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isFavourite = user.favourites.includes(bookid);
    if (isFavourite) {
      return res.status(400).json({
        success: false,
        message: "Book already in favourites",
      });
    }

    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });

    return res.status(200).json({
      success: true,
      message: "Book added to favourites",
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

router.put("/remove-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    const id = req.userId;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isFavourite = user.favourites.includes(bookid);

    if (!isFavourite) {
      return res.status(400).json({
        success: false,
        message: "Book not found in favourites",
      });
    }

    await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });

    return res.status(200).json({
      success: true,
      message: "Book removed from favourites",
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

router.get("/get-favourites", authenticateToken, async (req, res) => {
  try {
    const id = req.userId;

    const user = await User.findById(id).populate("favourites");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user.favourites,
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
