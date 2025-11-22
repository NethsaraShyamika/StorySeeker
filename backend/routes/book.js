const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const authenticateToken = require("../middlewares/userAuth");

//add book by admin

router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    // Check if the user is admin
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

        const existingBook = await Book.findOne({
      title: req.body.title.trim(),
      author: req.body.author.trim()
    });

    if (existingBook) {
      return res.status(400).json({ error: "Book already exists" });
    }

    const newBook = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      description: req.body.description,
      language: req.body.language,
      category: req.body.category,
    });
    await newBook.save();
    return res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const bookId = req.headers.bookid;

    if (!bookId) {
      return res.status(400).json({ error: "Book ID not provided" });
    }

    // Allowed fields for update
    const allowedFields = [
      "url",
      "title",
      "author",
      "price",
      "description",
      "language",
      "category"
    ];

    // Check if user is updating valid fields
    const updateFields = Object.keys(req.body);
    const isValid = updateFields.some((field) =>
      allowedFields.includes(field)
    );

    if (!isValid) {
      return res.status(400).json({ error: "No valid fields provided to update" });
    }

    // Update
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(200).json({ message: "Book updated successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const bookId = req.headers.bookid;
    if (!bookId) {
      return res.status(400).json({ error: "Book ID not provided" });
    }

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "success",
      data: books,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "success",
      data: books,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.json({
      status: "success",
      data: book,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
