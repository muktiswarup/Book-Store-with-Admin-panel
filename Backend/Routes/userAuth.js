const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRETE_KEY;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token == null) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  jwt.verify(token, secretkey, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token expired, please sign in again" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
