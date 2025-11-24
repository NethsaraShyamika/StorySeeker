const router = require("express").Router();
const User = require ("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/userAuth");

//Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    //check username length is more than 4
    if (username.length < 4) {
      return res
        .status(400)
        .json({ error: "Username must be at least 4 characters long" });
    }

    //check username already exists ?
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    //check email already exists ?
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //check password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      address: address,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Create user payload properly
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role
      },
      "bookStore123", // Use env variable in real projects
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      id: user._id,
      username: user.username,
      role: user.role,
      token: token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//get user information
router.get("/user-information", authenticateToken, async (req, res) => {
    try {
        const{id} = req.headers;
        const data = await User.findById(id).select("-password");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//update user information
router.put("/update-user", authenticateToken, async (req, res) => {
    try{
        const{id} = req.headers;
        const {username, email, address, avatar} = req.body;
        await User.findByIdAndUpdate(id, {
            username: username,
            email: email,
            address: address,
            avatar: avatar
        });
        res.status(200).json({ message: "User updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
