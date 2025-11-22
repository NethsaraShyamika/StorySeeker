const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("../middlewares/userAuth");

//add book to favourite
router.put("/add-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);

    const isFavourite = user.favourites.includes(bookid);
    if (isFavourite) {
      return res.status(400).json({ error: "Book already in favourites" });
    }

    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/remove-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);
    const isFavourite = user.favourites.includes(bookid);
    if (!isFavourite) {
      return res.status(400).json({ error: "Book not found in favourites" });
    }
    await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    return res.status(200).json({ message: "Book removed from favourites" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-favourites", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("favourites");
    const favouriteBooks = user.favourites;
    return res.json({
        status: "success",
        data: favouriteBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
