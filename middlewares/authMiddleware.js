const jwt = require("jsonwebtoken");

class authenticate {
  constructor(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const verified = jwt.verify(token, process.env.SECRET_JWT_KEY);
    if (!verified) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    next();
  }
}

module.exports = {
  authenticate,
};

