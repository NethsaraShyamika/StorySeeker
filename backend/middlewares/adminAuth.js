const User = require("../models/user");

const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.role || user.role.toLowerCase() !== "admin") {
      return res.status(403).json({ status: "error", message: "Access denied" });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


module.exports = authorizeAdmin;