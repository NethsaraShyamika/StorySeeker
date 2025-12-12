const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const authenticateToken = require("../middlewares/userAuth");

// Add book by admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const existingBook = await Book.findOne({
      title: req.body.title.trim(),
      author: req.body.author.trim(),
    });

    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Book already exists",
      });
    }

    const newBook = new Book(req.body);
    await newBook.save();

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newBook,
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

// Update book
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;

    if (!bookid) {
      return res.status(400).json({
        success: false,
        message: "Book ID not provided",
      });
    }

    const allowedFields = ["url", "title", "author", "price", "description", "language", "category"];
    const updateFields = Object.keys(req.body);
    const isValid = updateFields.some((field) => allowedFields.includes(field));

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided to update",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookid,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
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

// Delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;

    if (!bookid) {
      return res.status(400).json({
        success: false,
        message: "Book ID not provided",
      });
    }

    const deletedBook = await Book.findByIdAndDelete(bookid);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
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

// Get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: books,
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

// Get recent books
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({
      success: true,
      data: books,
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

// Get book by ID
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: book,
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
